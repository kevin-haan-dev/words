import { motion } from "framer-motion";

function ZoomInAnimation({ count, children }) {
  const delayPerItem = 0.1;

  return (
    <div className="flex gap-5 justify-center">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * delayPerItem }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}

export default ZoomInAnimation;
