import { motion } from "framer-motion";

export default function HowToOrder() {
  const steps = [
    {
      number: "01",
      title: "Choose Platform",
      description:
        "Select your preferred platform such as TikTok, Instagram, YouTube, or Facebook.",
      
    },
    {
      number: "02",
      title: "Select Service",
      description:
        "Pick the service that fits your goal. This could be followers, likes, views, or other engagement options.",
      
    },
    {
      number: "03",
      title: "Enter Details",
      description:
        "Provide your profile or content link and choose the quantity you want.",
      
    },
    {
      number: "04",
      title: "Complete Order",
      description:
        "Finish checkout and your order will begin processing shortly.",
      
    },
    {
      number: "05",
      title: "Final Step",
      description:
        "Your engagement will start appearing on your content.",
      
    },
  ];

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold  bg-clip-text mb-4 ">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple step-by-step process to get started quickly.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 relative">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative group"
            >

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-gradient-to-r from-pink-300 to-purple-300 opacity-40"></div>
              )}

              {/* Circle */}
              <div className="relative z-10 w-14 h-14 mx-auto flex items-center justify-center rounded-full 
              bg-white text-sm font-bold text-gray-900 mb-4 shadow-lg border border-pink-200 
              group-hover:scale-110 group-hover:bg-gradient-to-r  
              transition-all duration-300">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-125">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-500 transition">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>

            </motion.div>
          ))}

        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 opacity-20 blur-3xl rounded-full"></div>
    </section>
  );
}