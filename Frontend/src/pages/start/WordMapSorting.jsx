import { useContext } from "react";
import { WordMapContext } from "../../context/WordMapContext";
import { motion } from "framer-motion";
import { TiSortAlphabetically } from "react-icons/ti";
import { TiSortNumerically } from "react-icons/ti";
function WordMapSorting() {
  const { sortOption, setSortOption } = useContext(WordMapContext);

  const toggleSortOption = () => {
    setSortOption(sortOption === "alphabet" ? "count" : "alphabet");
  };

  const sliderClass =
    sortOption === "alphabet" ? "justify-start" : "justify-end";

  return (
    <div className="flex w-fit mx-auto font-black uppercase my-20 sm:my-0 text-3xl">
      <div className="my-auto">
        <TiSortAlphabetically />
      </div>
      <div
        onClick={toggleSortOption}
        className="cursor-pointer mx-5 bg-white shadow-xl rounded-full flex items-center w-28 h-12 relative"
      >
        <div
          className={`flex absolute w-full h-full  items-center ${sliderClass}`}
        >
          <motion.div
            className="rounded-full  bg-gradient-to-tr from-[#71B280] to-[#134E5E] w-9 h-9 m-2 "
            layout
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.2,
            }}
          />
        </div>
      </div>
      <div className="my-auto">
        <TiSortNumerically />
      </div>
    </div>
  );
}

export default WordMapSorting;
