import React from "react";
import { motion } from "framer-motion";

// ...existing code...

const NumberFlow = ({ number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* ...existing code... */}
      <div>{number}</div>
      {/* ...existing code... */}
    </motion.div>
  );
};

// ...existing code...

export default NumberFlow;
