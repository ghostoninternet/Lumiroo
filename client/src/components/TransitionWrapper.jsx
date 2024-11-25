import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const TransitionWrapper = ({ children, direction }) => {
  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction} // Điều chỉnh theo chiều
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="absolute w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionWrapper;
