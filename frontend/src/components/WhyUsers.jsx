import { Check } from "lucide-react";

export default function WhyUSer() {
  const features = [
    {
      title: "Ideal for Everyone",
      desc: "Everyone starts somewhere, and growth takes time. TikyTop is there to support you at every stage, whether you are new or already posting regularly.",
    },
    {
      title: "Make Every Post Count",
      desc: "Every post you create deserves attention. TikTok gives each post a better chance to perform well and lets you sustain the competition. ",
    },
    {
      title: "Grow at Your Own Pace",
      desc: "There’s no pressure to go big instantly. You can take it step by step and grow your account in a way that feels right.",
    },
    {
      title: "Stay Consistent, See Results",
      desc: "When your posts start getting attention, it becomes easier to keep going. TikyTop helps you stay on track without feeling stuck.",
    },
  ];

  return (
    <section className="bg-[#f7f7f9] py-16 px-4 sm:px-6 lg:px-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
  
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.3]">
           Why Social Media Users Love

          <span className="block mt-2 pb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            TikyTop
          </span>
        </h2>

        <p className="mt-6 text-gray-500 text-sm sm:text-base">
          At the end of the day, people want something easy and effective. TikyTop keeps things simple while helping your profile look more engaging.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <Check className="text-white w-5 h-5" />
            </div>

            {/* Text */}
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}