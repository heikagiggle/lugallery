'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-center text-[#1F1F1F]">
                Welcome Back
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5603AD]"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5603AD]"
              />
              <button className="w-full bg-[#5603AD] text-white py-2 rounded-lg hover:bg-[#440290] transition">
                Login
              </button>
              <p className="text-sm text-center">
                Don&apos;t have an account?{' '}
                <button
                  onClick={toggleMode}
                  className="text-[#5603AD] font-medium hover:underline"
                >
                  Register here
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-center text-[#1F1F1F]">
                Create Account
              </h2>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5603AD]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5603AD]"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5603AD]"
              />
              <button className="w-full bg-[#5603AD] text-white py-2 rounded-lg hover:bg-[#440290] transition">
                Register
              </button>
              <p className="text-sm text-center">
                Already have an account?{' '}
                <button
                  onClick={toggleMode}
                  className="text-[#5603AD] font-medium hover:underline"
                >
                  Login here
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginForm;
