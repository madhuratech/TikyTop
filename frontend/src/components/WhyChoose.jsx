import { Shield, Sparkles, Wallet, Lock, Users, Zap, RefreshCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Authentic & Safe",
    desc: "First of all, your safety matters. TikyTop doesn’t ask for any sensitive details, so your account stays secure. So you can use the service without constantly worrying about your profile.",
  },
  {
    icon: Sparkles,
    title: "High-Quality Results",
    desc: "Also, the engagement you get actually looks natural and fits your content. Because of that, your profile doesn’t feel empty or forced. It feels real and active.",
  },
  {
    icon: Wallet,
    title: "Affordable Packages",
    desc: "On top of that, there are options for every budget. You don’t have to spend a lot to get started. In fact, you can begin small and increase anytime you want.",
  },
  {
    icon: Lock,
    title: "No Password Required",
    desc: "Most importantly, there’s no need to share your password at all. Instead, you just provide your username or post link and you’re good to go.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    desc: "Plus, a lot of users are already using TikyTop for their growth. So you’re not trying something random. It’s something people already rely on.",
  },
  {
    icon: Zap,
    title: "Quick & Reliable Delivery",
    desc: "At the same time, you won’t be waiting forever. Orders usually start quickly. That way, you can see changes sooner rather than later.",
  },
  {
    icon: RefreshCcw,
    title: "Refill & Refund Options",
    desc: "And if anything doesn’t go as expected, there are refill and refund options available. So you always have that extra layer of assurance.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Finally, if you ever have questions or need help, support is available anytime. You can reach out whenever you want and get things sorted without hassle.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#f9fafb] py-16 px-4 ">
      <div className="max-w-7xl mx-auto text-center">


        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
          <span className="block mb-2">
            Why Choose TikyTop for
          </span>
          <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mt-3">
            TikTok Growth?
          </span>
        </h2>
        {/* Subtitle */}
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto
          text-sm sm:text-base md:text-lg">
          Growing on TikTok can feel slow, even when you’re doing everything right. TikyTop helps you get that extra push so your content doesn’t go unnoticed.

        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-6
          sm:grid-cols-2
          lg:grid-cols-4">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left
              shadow-sm hover:shadow-md transition duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-100 mb-4">
                <item.icon className="text-pink-500 w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 mt-2 text-sm md:text-[15px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}