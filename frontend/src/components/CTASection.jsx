

export default function CTASection() {


  return (
    <div className="py-20 px-6 relative overflow-hidden">

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB3D9]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-[#FFA500]/20 to-[#FFE5D9]/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Main CTA Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/70 p-12 md:p-16 shadow-2xl text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            Ready to Take the Spotlight on Social Media?
          </h2>

          <p className="text-lg text-gray-800 mb-8 leading-relaxed max-w-3xl mx-auto">
            Every creator, brand, or business wants to stand out and be recognised. With the right push, your content can reach more people, attract attention, and build a presence that turns profiles into popular platforms.
          </p>

          <p className="text-lg text-gray-800 mb-8 leading-relaxed max-w-3xl mx-auto">
            At Tikytop, we help you move closer to that spotlight. Grow across TikTok, Instagram, YouTube, and Facebook with services designed to increase followers, likes, and views.
          </p>

          <p className="text-base text-gray-700 mb-10 max-w-3xl mx-auto">
            Whether you want to buy TikTok likes, buy Instagram followers, buy YouTube views, or buy Facebook page likes, the right engagement can help your profile gain momentum and recognition.
          </p>

          <button
            className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            onClick={() => {
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Step Into the Spotlight Soon
          </button>

          {/* <button
            className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/payment")}
          >
            Step Into the Spotlight Soon
          </button> */}

        </div>

      </div>
    </div>
  );
}
