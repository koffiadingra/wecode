import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import authService from "../../appwrite/auth";

interface RegisterPageProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({
  onRegister,
  onSwitchToLogin,
}: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErreur("Passwords do not match!");
      return;
    }

    const result = await authService.createAccount({
      email: email,
      password: password,
      name: name,
    });
    if (result) {
      // Simulate registration
      onRegister();
    }
    //console.log(result);
  };

  const getFieldIcon = (fieldName: string) => {
    if (focusedField === fieldName) {
      return <Sparkles size={16} className="text-[#6B9B7C]" />;
    }
    return null;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F5EDE4 0%, #E8D9C9 30%, #6B9B7C 100%)",
      }}
    >
      {/* Decorative background patches */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20"
          style={{ background: "#6B9B7C" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-96 h-96 rounded-full opacity-15"
          style={{ background: "#F5EDE4" }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: "#C85A3C" }}
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Register Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full order-2 md:order-1"
          >
            <div className="bg-white dark:bg-[#1A2332] rounded-[18px] shadow-2xl p-8 md:p-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="mb-3" style={{ color: "#1A2332" }}>
                  Create Your Account
                </h1>
                <p className="text-[#5A5F6B] dark:text-[#9CA3AF]">
                  Begin your journey to mindfulness and inner peace
                </p>

                <div
                  style={{ color: "#FF0000", textAlign: "center", padding: 3 }}
                >
                  {erreur}
                </div>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label
                    htmlFor="name"
                    className="block mb-2 text-[#1A2332] dark:text-[#F5EDE4] flex items-center gap-2"
                  >
                    Name
                    <AnimatePresence>
                      {focusedField === "name" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          {getFieldIcon("name")}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <motion.input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-[#F5EDE4] dark:bg-[#2A3647] border-2 border-transparent rounded-[14px] 
                             text-[#1A2332] dark:text-[#F5EDE4] placeholder-[#5A5F6B] dark:placeholder-[#9CA3AF]
                             focus:border-[#6B9B7C] focus:outline-none transition-all duration-300"
                    placeholder="Your full name"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label
                    htmlFor="reg-email"
                    className="block mb-2 text-[#1A2332] dark:text-[#F5EDE4] flex items-center gap-2"
                  >
                    Email
                    <AnimatePresence>
                      {focusedField === "email" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          {getFieldIcon("email")}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <motion.input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-[#F5EDE4] dark:bg-[#2A3647] border-2 border-transparent rounded-[14px] 
                             text-[#1A2332] dark:text-[#F5EDE4] placeholder-[#5A5F6B] dark:placeholder-[#9CA3AF]
                             focus:border-[#6B9B7C] focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label
                    htmlFor="reg-password"
                    className="block mb-2 text-[#1A2332] dark:text-[#F5EDE4] flex items-center gap-2"
                  >
                    Password
                    <AnimatePresence>
                      {focusedField === "password" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          {getFieldIcon("password")}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <div className="relative">
                    <motion.input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-[#F5EDE4] dark:bg-[#2A3647] border-2 border-transparent rounded-[14px] 
                               text-[#1A2332] dark:text-[#F5EDE4] placeholder-[#5A5F6B] dark:placeholder-[#9CA3AF]
                               focus:border-[#6B9B7C] focus:outline-none transition-all duration-300 pr-12"
                      placeholder="Create a strong password"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A5F6B] dark:text-[#9CA3AF] 
                               hover:text-[#6B9B7C] transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-[#1A2332] dark:text-[#F5EDE4] flex items-center gap-2"
                  >
                    Confirm Password
                    <AnimatePresence>
                      {focusedField === "confirmPassword" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          {getFieldIcon("confirmPassword")}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {password &&
                      confirmPassword &&
                      password === confirmPassword && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <CheckCircle2 size={16} className="text-[#6B9B7C]" />
                        </motion.span>
                      )}
                  </label>
                  <div className="relative">
                    <motion.input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-[#F5EDE4] dark:bg-[#2A3647] border-2 border-transparent rounded-[14px] 
                               text-[#1A2332] dark:text-[#F5EDE4] placeholder-[#5A5F6B] dark:placeholder-[#9CA3AF]
                               focus:border-[#6B9B7C] focus:outline-none transition-all duration-300 pr-12"
                      placeholder="Confirm your password"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A5F6B] dark:text-[#9CA3AF] 
                               hover:text-[#6B9B7C] transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    className="w-full relative overflow-hidden bg-[#C85A3C] hover:bg-[#B44E30] text-white 
                             py-4 rounded-[14px] transition-all duration-300 shadow-lg hover:shadow-xl"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Create Account</span>

                    {/* Bounce effect on hover */}
                    <AnimatePresence>
                      {isHovering && (
                        <motion.div
                          className="absolute inset-0 bg-white opacity-20"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.2 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </form>

              {/* Login link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-6 text-center"
              >
                <p className="text-[#5A5F6B] dark:text-[#9CA3AF]">
                  Already have an account?{" "}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-[#C85A3C] hover:text-[#B44E30] transition-colors duration-200"
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center order-1 md:order-2"
          >
            <motion.div
              className="relative w-full max-w-md"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1710596220294-3f88dfe02fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwZ3JlZW4lMjBwbGFudHMlMjBncm93dGh8ZW58MXx8fHwxNzYzNzM2MDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Natural green plants growth"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />

              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-6 -right-6 text-[#6B9B7C]"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles size={40} />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 text-[#C85A3C] opacity-70"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <Sparkles size={32} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
