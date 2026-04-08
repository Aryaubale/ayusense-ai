import React from "react";
import { motion } from "framer-motion";
import Layout from "./Layout"; // ✅ THIS IS THE KEY FIX

const AnimatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </Layout>
  );
};

export default AnimatedLayout;