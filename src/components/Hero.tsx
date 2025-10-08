import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "DESIGN ENGINEER";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm tracking-widest">
            <div className="w-12 h-px bg-cyan-400" />
            <span>sevander 2025</span>
            <div className="w-12 h-px bg-cyan-400" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">
            SEVEN ALEXANDER
          </span>
        </h1>

        <div className="h-16 md:h-20 mb-8">
          <p className="text-2xl md:text-4xl font-light tracking-wider text-cyan-400">
            {text}
            <span
              className={`inline-block w-1 h-8 md:h-10 bg-cyan-400 ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </p>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Crafting pixel-perfect interfaces and building seamless user
          experiences at the intersection of design and code
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToAbout}
            className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-medium tracking-wider overflow-hidden transition-all duration-300 hover:text-black"
          >
            <span className="relative z-10">EXPLORE WORK</span>
            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button className="group relative px-8 py-4 bg-cyan-400 text-black font-medium tracking-wider overflow-hidden transition-all duration-300 hover:bg-cyan-300">
            <span className="relative z-10">GET IN TOUCH</span>
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-cyan-400 animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </div>
  );
}
