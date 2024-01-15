import { useWordMapContext } from "../../context/WordMapContext";
import { motion, AnimatePresence } from "framer-motion";

function WordModal() {
  const { selectedWord, setSelectedWord } = useWordMapContext();

  return (
    <AnimatePresence>
      {selectedWord && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2, ease: "linear" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "linear" } }}
          onClick={() => setSelectedWord(null)}
        >
          <motion.div
            className=" font-black text-xl"
            initial={{ scale: 0.5 }}
            animate={{
              scale: 1,
              transition: {
                type: "spring",
                duration: 0.5,
                stiffness: 100,
              },
            }}
            exit={{
              scale: 0.5,
              transition: {
                duration: 0.1,
              },
            }}
          >
            "{selectedWord.word}" erschien {selectedWord.count} mal
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WordModal;
