import { useRef, useEffect } from 'react'
import image1 from '../assets/images/1.png'
import image2 from '../assets/images/2.png'
import image3 from '../assets/images/3.png'
import image4 from '../assets/images/4.png'
import image5 from '../assets/images/5.png'
import image6 from '../assets/images/6.png'
import image7 from '../assets/images/7.png'

export default function Testimonials() {
  const scrollRef = useRef(null)

  const testimonials = [
    {
      name: 'Ethan',
      location: 'Canada',
      text: "I’ve tried a couple of services before, but this one impressed me a lot. The likes and comments didn’t look fake or spammy. It actually helped my content reach more people. ",
      rating: 4,
      avatar: image1
    },
    {
      name: 'Charlotte',
      location: 'Australia',
      text: "We run a small clothing brand, and TikTok visibility is everything. After using this service, our product videos started performing better, and we even got a few real customers from it. Super happy with TikyTop service! ",
      rating: 5,
      avatar: image4
    },
    {
      name: 'Jackson',
      location: 'UAE',
      text: "What I liked most is that the growth didn’t drop off suddenly. It felt gradual and realistic, which is important if you’re building a personal brand. ",
      rating: 4,
      avatar: image2
    },
    {
      name: 'Madison',
      location: 'Spain',
      text: "The delivery was smooth, and nothing messed with my account. That was my biggest concern. Thumbs up to the TikyTop team!",
      rating: 4,
      avatar: image5
    },
    {
      name: 'Noah',
      location: 'South Korea',
      text: "I was stuck at the same follower count for months, no matter what I posted. It honestly felt frustrating. After trying this, I finally saw some improvement, and it gave me the motivation to keep creating again. Great thanks!",
      rating: 5,
      avatar: image3
    },
     {
      name: 'Harper',
      location: 'Russia',
      text: "I had decent content, but barely any likes. It made my page look inactive. This helped balance things out and made my account look more credible. Highly recommended!",
      rating: 4,
      avatar: image6
    },
    {
      name: 'Avery',
      location: 'Germany',
      text: "As a content creator, I needed a reliable service to grow my audience. TikyTop delivered beyond my expectations. The growth was natural and sustainable.",
      rating: 5,
      avatar: image7
    }
  ]

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId

    const autoScroll = () => {
      scrollContainer.scrollLeft += 0.5
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      }
      animationId = requestAnimationFrame(autoScroll)
    }

    animationId = requestAnimationFrame(autoScroll)

    return () => cancelAnimationFrame(animationId)
  }, [])

  const TestimonialCard = ({ testimonial }) => (
    <div className="flex-shrink-0 w-80 mx-4 rounded-2xl p-6 shadow-lg transition-all duration-500 hover:scale-105 
    bg-white border border-pink-100 hover:shadow-pink-200/50 relative overflow-hidden group">

      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300/20 blur-3xl rounded-full"></div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
        "{testimonial.text}"
      </p>

      {/* Profile */}
      <div className="flex items-center gap-3 pt-4 border-t border-pink-100">
        <img 
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-200"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            {testimonial.name}
          </h4>
          <p className="text-xs text-gray-500">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-pink-50 via-white to-pink-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Esteemed Users Say About {" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
             TikyTop
          </span>
          </h2>
        
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}