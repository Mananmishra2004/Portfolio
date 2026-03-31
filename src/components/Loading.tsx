import { motion } from 'motion/react';

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-dark-bg flex items-center justify-center">
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-blue-400 font-bold tracking-widest text-center"
        >
          LOADING...
        </motion.div>
      </div>
    </div>
  );
};
