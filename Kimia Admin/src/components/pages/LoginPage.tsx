import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import authService from "../../appwrite/auth";

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onLogin, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    const result = await authService.login({
      email: email,
      password: password,
    });
    console.log(result);

    if (result) {
      // Simulate login
      onLogin();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F5EDE4 0%, #E8D9C9 50%, #1A2332 100%)",
      }}
    >
      {/* Decorative background patches */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{ background: "#1A2332" }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: "#6B9B7C" }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center"
          >
            <motion.div
              className="relative w-full max-w-md"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1548688265-62dae8daeb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsZWF2ZXMlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjM3MzYwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Nature leaves wellness"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />

              {/* Floating leaf decorations */}
              <motion.div
                className="absolute -top-8 -right-8 text-[#6B9B7C] opacity-70"
                animate={{
                  rotate: [0, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Leaf size={48} />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 text-[#C85A3C] opacity-60"
                animate={{
                  rotate: [0, -15, 0],
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Leaf size={36} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white dark:bg-[#1A2332] rounded-[18px] shadow-2xl p-8 md:p-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <h1 className="mb-3" style={{ color: "#1A2332" }}>
                  Welcome Back
                </h1>
                <p className="text-[#5A5F6B] dark:text-[#9CA3AF]">
                  Step into your peaceful space of mindfulness and growth
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[#1A2332] dark:text-[#F5EDE4]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5EDE4] dark:bg-[#2A3647] border-2 border-transparent rounded-[14px] 
                             text-[#1A2332] dark:text-[#F5EDE4] placeholder-[#5A5F6B] dark:placeholder-[#9CA3AF]
                             focus:border-[#C85A3C] focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label
                    htmlFor="password"
                    className="block mb-2 text-[#1A2332] dark:text-[#F5EDE4]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F5EDE4] dark:bg-[#2A3647] border-2 border-transparent rounded-[14px] 
                               text-[#1A2332] dark:text-[#F5EDE4] placeholder-[#5A5F6B] dark:placeholder-[#9CA3AF]
                               focus:border-[#C85A3C] focus:outline-none transition-all duration-300 pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A5F6B] dark:text-[#9CA3AF] 
                               hover:text-[#C85A3C] transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex justify-end"
                >
                  <button
                    type="button"
                    className="text-[#C85A3C] hover:text-[#B44E30] transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <button
                    type="submit"
                    className="w-full relative overflow-hidden bg-[#C85A3C] hover:bg-[#B44E30] text-white 
                             py-4 rounded-[14px] transition-all duration-300 shadow-lg hover:shadow-xl
                             active:scale-[0.98]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span className="relative z-10">Login</span>

                    {/* Ripple effect on hover */}
                    {isHovering && (
                      <motion.div
                        className="absolute inset-0 bg-white opacity-20 rounded-full"
                        initial={{ scale: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ left: "50%", top: "50%" }}
                      />
                    )}
                  </button>
                </motion.div>
              </form>

              {/* Register link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <p className="text-[#5A5F6B] dark:text-[#9CA3AF]">
                  Don't have an account?{" "}
                  <button
                    onClick={onSwitchToRegister}
                    className="text-[#C85A3C] hover:text-[#B44E30] transition-colors duration-200"
                  >
                    Create Account
                  </button>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
