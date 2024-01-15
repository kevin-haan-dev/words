import { useRef } from "react";
import { useInView, LazyMotion, domAnimation, m } from "framer-motion";
import { useWordMapContext } from "../../context/WordMapContext";

const Word = ({ word, count }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { setSelectedWord } = useWordMapContext();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer flex-grow flex-shrink-0 text-sm hover:bg-gray-700 duration-300 transition-all font-bold  shadow-xl bg-white bg-opacity-10 rounded m-2 sm:m-4 py-3 px-6 sm:py-6 sm:px-12 relative"
        onClick={() => setSelectedWord({ word, count })}
      >
        {word}
        <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-3 sm:text-lg rounded-full font-black p-2">
          {count}
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Word;
