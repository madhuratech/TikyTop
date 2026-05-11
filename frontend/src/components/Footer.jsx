import { FaTiktok, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import RazorPay from "../assets/logos/RazorPay.png"
import Paytm from "../assets/logos/Paytm.svg"
import Paypal from "../assets/logos/PayPal.svg"
import PayU from "../assets/logos/PayU.svg"
import TikyTop from "../assets/logos/TikyTop.png"
import Cashfree from "../assets/logos/Cashfree.svg"
import Hero from "./Hero";
// import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* LOGO */}
          <div className="space-y-4">
            <img src={TikyTop} alt="Logo" className="h-24 object-contain" />
            <p className="text-white/90 leading-relaxed max-w-xs">
              Your trusted platform for smart shopping. Fast, secure, and reliable services.
            </p>
          </div>


          {/* RESOURCES */}
          <div className="flex flex-col items-center">

            <div className="w-fit">
              <h3 className="font-semibold text-lg mb-4 text-pink-500 ">
                Resources
              </h3>

              <ul className="space-y-2 text-left">
                {["Blog", "About Us", "Contact", "Terms of Service", "Privacy Policy"].map((item) => (
                  <li
                    key={item}
                     onClick={() => {
                        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });}}
                    className="cursor-pointer transition duration-300 "
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-pink-500">
              Services
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Instagram Services", icon: <FaInstagram /> },
                { name: "Facebook Services", icon: <FaFacebook /> },
                { name: "Youtube Services", icon: <FaYoutube /> },
              ].map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-3 cursor-pointer transition duration-300"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PAYMENTS */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-pink-500">We accept</h3>

            <div className="flex flex-wrap gap-3 ">
              {[RazorPay, Paytm, Paypal, PayU, Cashfree].map((logo, i) => (
                <div
                  key={i}
                  className=" backdrop-blur-md px-3 py-2 rounded-lg hover:bg-white/30 transition"
                >
                  <img src={logo} alt="payment" className="h-5 object-contain" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 ">

          {/* LEFT */}
          <p className="text-white/80 text-center md:text-left">
            © {new Date().getFullYear()} TikyTop. All rights reserved.
          </p>

          {/* SOCIAL */}
          <div className="flex items-center gap-5 text-xl">
            <FaInstagram className="cursor-pointer hover:scale-110  transition" />
            <FaYoutube className="cursor-pointer hover:scale-110  transition" />
          </div>

        </div>

      </div>

    </footer>
  );
}