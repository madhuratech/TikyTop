const puppeteer = require("puppeteer");

const parseCount = (text) => {
  if (!text) return 0;
  const str = text.toLowerCase().replace(/,/g, "").trim();
  let num = parseFloat(str);
  if (str.includes("m")) num *= 1000000;
  else if (str.includes("k")) num *= 1000;
  return isNaN(num) ? 0 : Math.floor(num);
};

const getFacebookAll = async (link) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,800"],
    });

    const page = await browser.newPage();
    
    // 1. Pretend to be a real desktop browser to avoid login redirects
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36");
    await page.setViewport({ width: 1280, height: 800 });

    // Try mbasic first (much more stable for scraper) if it's not a direct post link
    let scrapeUrl = link;
    if (!link.includes("mbasic.facebook.com") && !link.includes("/posts/") && !link.includes("/videos/")) {
      scrapeUrl = link.replace(/^(https?:\/\/)?(www\.)?facebook\.com/, "$1mbasic.facebook.com");
    }

    console.log(`[FacebookScraper] Scrapping: ${scrapeUrl}`);
    await page.goto(scrapeUrl, { waitUntil: "domcontentloaded", timeout: 45000 });

    // --- Automatic Pagination: Try to load more posts ---
    try {
      // Look for "See more stories" or similar on mbasic
      const seeMoreLink = await page.$('a[href*="m_more_item"], a[href*="sk=stories"], a[href*="/stories.php"]');
      if (seeMoreLink) {
        console.log("[FacebookScraper] Found 'See more' link, loading more posts...");
        await seeMoreLink.click();
        // Wait for the next batch of posts to load
        await new Promise(r => setTimeout(r, 5000));
      }
    } catch (paginationError) {
      console.log("[FacebookScraper] Pagination failed, continuing with initial posts.");
    }

    // Check if we are stuck on a login page
    const currentUrl = page.url();
    if (currentUrl.includes("facebook.com/login")) {
      console.log("[FacebookScraper] Redirected to login. Retrying with main site...");
      await page.goto(link, { waitUntil: "networkidle2", timeout: 45000 });
    }

    const data = await page.evaluate(() => {
      const fullText = document.body.innerText;
      
      // Look for follower data in Meta Tags or Body Text
      const metaDescription = document.querySelector('meta[name="description"]')?.content || "";
      const fMatch = metaDescription.match(/([\d.KkMm]+)\sfollowers/i) || 
                     fullText.match(/Followed by\s+([\d,.]+([MKk])?)/i) || 
                     fullText.match(/([\d,.]+([MKk])?)\s+followers/i);
      
      const lMatch = metaDescription.match(/([\d.KkMm]+)\sfollowing/i) || 
                     fullText.match(/([\d,.]+([MKk])?)\s+following/i);

      // Extract Name
      const name = document.querySelector('h1, strong, b')?.innerText || "Facebook User";

      // Extract Avatar
      const avatarImg = document.querySelector('img[alt*="profile"]') || 
                        document.querySelector('image') || 
                        document.querySelector('svg g image') ||
                        document.querySelector('img[src*="profile"]');
                        
      const avatarUrl = avatarImg?.getAttribute('xlink:href') || avatarImg?.src || null;

      // Extract Posts - Highly Aggressive Detection
      const allLinks = Array.from(document.querySelectorAll('a[href*="/posts/"], a[href*="/videos/"], a[href*="/reel/"], a[href*="/story.php"], a[href*="/fbid="], a[href*="/permalink.php"]'));
      
      const posts = [];
      const seenUrls = new Set();
      
      allLinks.forEach((linkEl) => {
        let fullUrl = linkEl.href;
        // Clean the URL
        try {
          const urlObj = new URL(fullUrl);
          urlObj.searchParams.delete('refid');
          urlObj.searchParams.delete('__tn__');
          urlObj.searchParams.delete('_rdr');
          fullUrl = urlObj.toString();
        } catch(e) {}

        if (seenUrls.has(fullUrl)) return;
        seenUrls.add(fullUrl);

        // Find the best container (look up until we find a block-level element)
        let container = linkEl.parentElement;
        for(let i=0; i<10; i++) {
          if (!container) break;
          // In mbasic, posts are often in tables or divs with specific roles/classes
          if (container.tagName === 'TABLE' || container.getAttribute('role') === 'article' || container.classList.contains('bm') || container.classList.contains('bl')) break;
          container = container.parentElement;
        }
        
        if (!container) container = linkEl.parentElement || linkEl;

        // Find images in this container
        const allImgs = Array.from(container.querySelectorAll('img')).filter(img => {
          const src = img.src || "";
          return !src.includes('/emoji.php/') && 
                 !src.includes('/rsrc.php/') && 
                 !src.includes('/static_templates/') &&
                 !src.includes('avatar') && // Avoid picking up own avatar
                 (img.width > 40 || img.height > 40 || !img.width);
        });
        
        const imgUrl = allImgs.length > 0 ? allImgs[0].src : null;

        posts.push({
          id: `fb_${posts.length}`,
          content: container.innerText?.slice(0, 150).replace(/\n/g, " ").trim() || "Facebook Post",
          url: fullUrl,
          image: imgUrl
        });
      });

      const pMatch = metaDescription.match(/([\d.KkMm]+)\sposts/i) || 
                     fullText.match(/([\d,.]+([MKk])?)\s+posts/i);

      return {
        name,
        avatar: avatarUrl,
        followersRaw: fMatch ? (Array.isArray(fMatch) ? fMatch[1] : fMatch) : "0",
        followingRaw: lMatch ? (Array.isArray(lMatch) ? lMatch[1] : lMatch) : "0",
        postsRaw: pMatch ? (Array.isArray(pMatch) ? pMatch[1] : pMatch) : null,
        posts: posts.slice(0, 30)
      };
    });

    await browser.close();

    return {
      user: {
        name: data.name,
        avatar: data.avatar,
        followers: parseCount(data.followersRaw),
        following: parseCount(data.followingRaw),
        postsCount: data.postsRaw ? parseCount(data.postsRaw) : data.posts.length,
      },
      posts: data.posts,
    };
  } catch (err) {
    if (browser) await browser.close();
    console.error("[FacebookScraper] Error:", err.message);
    throw err;
  }
};

module.exports = { getFacebookAll };