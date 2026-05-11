import {
  Users,
  Briefcase,
  Star,
  Video,
  Rocket,
  Layers,
  User,
  ShoppingCart,
  TvMinimalPlay,
} from "lucide-react";
import { motion } from "framer-motion";

const data = [
  {
    icon: Users,
    title: "Influencers",
    desc: "If your followers have been stuck at the same number for a long time, this can help you move forward. More likes and comments also make your profile look active, which attracts real people and collabs.",
  },
  {
    icon: Briefcase,
    title: "Businesses",
    desc: "If you’re trying to promote products but not getting enough views, TikyTop helps more people see your content. When your posts have good engagement, there is a high chance that customers will trust and check your page.",
  },
  {
    icon: Star,
    title: "Brands",
    desc: "New or growing brands often struggle to get attention at first. This helps you look more established. It makes your posts feel more engaging, so people are more likely to stop and watch.",
  },
  {
    icon: Video,
    title: "Content Creators",
    desc: "If you’re putting a lot of effort into content but getting very low likes or views, this gives you a boost. Seeing better numbers can also motivate you to stay consistent and keep posting.",
  },
  {
    icon: Rocket,
    title: "Startups",
    desc: "Startups need visibility, especially in the beginning. This helps you get noticed faster. It gives your page a more active look, which helps people take your brand seriously.",
  },
  {
    icon: Layers,
    title: "Agencies",
    desc: "If you manage client accounts, this can help you improve their engagement quickly. It makes your work look more effective when clients see better activity on their pages.",
  },
  {
    icon: User,
    title: "Personal Profiles",
    desc: "If you just want to grow your account or don't feel like you’re posting to no one, this can make a huge difference. It makes your profile look more active and helps you get out of that “no response” phase.",
  },
   {
    icon: ShoppingCart,
    title: "E-Commerce Stores ",
    desc: "Make your products reach more people and make your store look more active and trustworthy online. A stronger social media presence can also attract better engagement and potential customers.",
  },
  {
    icon: TvMinimalPlay,
    title: "Bloggers and Digital Creators",
    desc: "Grow your audience, increase engagement, and make your content stand out on social media. Whether you create blogs, videos, or reels, better reach can help more people discover your work.", 

  },

];

// Animation container
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Card animation
const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function WhoBenefit() {
  return (
    <section className="relative bg-[#050508] text-white py-20 px-6 overflow-hidden">
      
      {/* 🌸 Glow Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-pink-500/20 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[280px] h-[280px] bg-pink-400/10 rounded-full blur-[140px]"></div>

      {/* 🌈 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/5 to-transparent pointer-events-none"></div>

      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-pink-400/40 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          Who Can Benefit the Most?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          TikyTop helps you boost reach, engagement, and visibility — no matter your niche.
        </motion.p>

        {/* 🔥 GRID LAYOUT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((itemData, index) => {
            const Icon = itemData.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative overflow-hidden 
                bg-[#0B0B0F] border border-white/5 rounded-2xl p-6 
                transition duration-300 hover:border-pink-500/40 
                hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]"
              >
                {/* Glow Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Icon */}
                <div className="bg-pink-500/10 p-4 rounded-xl w-fit mb-4 group-hover:bg-pink-500/20 transition">
                  <Icon className="text-pink-500" size={26} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">
                  {itemData.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {itemData.desc}
                </p>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-500 group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}