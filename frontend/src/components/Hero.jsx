import React, { use, useState } from "react";
import {
  FaStar,
  FaSearch,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tiky from "../assets/images/Tiky.png";
import { API_URL } from "../config";

export default function Hero ({ platform = "instagram", onSearch }) {
  const [active, setActive] = useState("TikTok");
  const [activeTab, setActiveTab] = useState('channel')
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [username, setUsername] = useState("");


  const navigate = useNavigate();

  const platforms = [
    { name: "TikTok", icon: <FaTiktok />, key: "tiktok" },
    { name: "Instagram", icon: <FaInstagram />, key: "instagram" },
    { name: "YouTube", icon: <FaYoutube />, key: "youtube" },
  ];

  const Platform_API_URLS = {
    Instagram: `${API_URL}/instagram/user/`,
    YouTube: `${API_URL}/youtube/search/`,
    TikTok: `${API_URL}/tiktok/user/`
  }

  const Getuser = async (e) => {
  if (!username) {
    alert("Please enter a username");
    return;
  }

  const API_URL =
    Platform_API_URLS[active] || Platform_API_URLS.Instagram;

  try {
    setIsSearching(true);

    const response = await fetch(`${API_URL}${username}`);
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (!data) {
      throw new Error(`Expected JSON from ${response.url}, but received ${contentType || "unknown content type"}`);
    }

    if (!response.ok) {
      alert(data.error || "An error occurred");
      return;
    }

    navigate("/profile-overview", {
      state: {
        userdata: data,
        platform: active.toLowerCase(),
        username: username,
      },
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    alert("An error occurred while fetching data.");
  } finally {
    setIsSearching(false);
  }
};


  return (
   <section id="hero">    
    <div
      className="relative min-h-screen flex items-center justify-center text-white px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${Tiky})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Rating */}
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-sm bg-white/10 rounded-full backdrop-blur">
          <FaStar className="text-yellow-400" />
          Rated 4.8 on Trustscore
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight font-righteous">
          Trusted Site to Turn Your Profile into a Powerful Platform
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
          Grow your audience and increase engagement across TikTok, Instagram,
          and YouTube with TikyTop.
        </p>

        {/* SEARCH + PLATFORM SELECT */}
        <div className="mt-10 max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-5 flex-wrap">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => setActive(platform.name)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  active === platform.name
                    ? "bg-white text-black shadow-lg scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105"
                }`}
              >
                <span className="text-lg">{platform.icon}</span>
                {platform.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-white/50">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${active} username or URL`}
              className="w-full px-5 py-3 bg-transparent outline-none text-sm placeholder-gray-400"
            />

            <button
               onClick={Getuser}
              disabled={isSearching}
              className="px-6 py-3 text-white hover:opacity-80 transition disabled:opacity-50"
            >
              {isSearching ? "..." : <FaSearch />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <h2 className="text-2xl font-bold">50K+</h2>
            <p className="text-gray-300 text-sm mt-1">Happy Creators</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <h2 className="text-2xl font-bold">10M+</h2>
            <p className="text-gray-300 text-sm mt-1">Likes Delivered</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <h2 className="text-2xl font-bold">24/7</h2>
            <p className="text-gray-300 text-sm mt-1">Live Support</p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
