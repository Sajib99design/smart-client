import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router";

const slides = [
    {
        id: 1,
        image: "https://i.ibb.co.com/Df2ZsCyt/slider.jpg",
        title: "Bring Nature Into Your Home",
        subtitle: "Fresh, Green & Peaceful Vibes",
    },
    {
        id: 2,
        image: "https://i.ibb.co.com/tpSYcy3H/slider3.jpg",
        title: "Decorate with Living Beauty",
        subtitle: "Transform your space with plants",
    },
    {
        id: 3,
        image: "https://i.ibb.co.com/Zz5rFX6r/slider2.jpg",
        title: "Purify the Air You Breathe",
        subtitle: "Healthy life starts with green friends",
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    // Auto Slide every 5s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[80vh] overflow-hidden rounded-2xl shadow-lg">
            <AnimatePresence>
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                        <motion.h2
                            key={slides[current].title}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold mb-4"
                        >
                            {slides[current].title}
                        </motion.h2>
                        <motion.p
                            key={slides[current].subtitle}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-lg md:text-2xl mb-6"
                        >
                            {slides[current].subtitle}
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-800 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition"
                        >

                            <Link to={'/'}> Shope </Link>
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-5 flex justify-center w-full space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${current === index ? "bg-green-400" : "bg-white/60"
                            }`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default Hero;