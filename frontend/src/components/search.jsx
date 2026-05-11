import { FaInstagram, FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3e7ff] via-[#f8ecff] to-[#fdf2ff]">

      {/* BIG BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[180px] font-black text-gray-300/20 tracking-widest select-none">
          GROWTH
        </h1>
      </div>
      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-3xl w-full">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg">
            <FaInstagram className="text-white text-2xl" />
          </div>
        </div>
        {/* HEADING */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Grow Your{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Instagram
          </span>{" "}
          Following
        </h1>
        {/* SUBTEXT */}
        <p className="text-gray-500 text-lg mb-8">
          Get real Instagram followers, likes, views, and comments to grow your
          profile organically.
        </p>
        {/* SEARCH BAR */}
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden max-w-xl mx-auto">
          {/* INPUT */}
          <div className="flex items-center px-4 w-full">
            <span className="text-gray-400 mr-2">@</span>
            <input
              type="text"
              placeholder="Enter Instagram username"
              className="w-full py-3 outline-none text-gray-700"
            />
          </div>
          {/* BUTTON */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
            <FaSearch />
            SEARCH
          </button>
        </div>
        {/* STATS */}
        <div className="flex justify-center gap-12 mt-10 text-center">
          <div>
            <h2 className="text-2xl font-bold text-purple-600">50K+</h2>
            <p className="text-gray-500 text-sm">Active Users</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-600">4.9★</h2>
            <p className="text-gray-500 text-sm">Rated</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600">24/7</h2>
            <p className="text-gray-500 text-sm">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}