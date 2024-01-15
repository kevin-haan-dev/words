import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { useWordMapContext } from "../../context/WordMapContext";
import { motion } from "framer-motion";
import { useState } from "react";

function WordMapTitle({ title, index, postsLength }) {
  const { setCurrentPage, currentPage, totalPosts } = useWordMapContext();
  const [animationDirection, setAnimationDirection] = useState("next");

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPosts - 1;

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setAnimationDirection("previous");
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (hasNextPage) {
      setAnimationDirection("next");
      setCurrentPage(currentPage + 1);
    }
  };

  const variants = {
    initialPrevious: { x: 25, opacity: 0 },
    animatePrevious: { x: 0, opacity: 1 },
    exitPrevious: { x: -50, opacity: 0 },
    initialNext: { x: -25, opacity: 0 },
    animateNext: { x: 0, opacity: 1 },
    exitNext: { x: 50, opacity: 0 },
  };

  const transition = {
    type: "spring",
    duration: 0.2,
    stiffness: 100,
  };

  return (
    <div className="min-h-60">
      <div className="flex justify-center my-10">
        <div
          className={`${
            hasPreviousPage ? "opacity-100" : "opacity-0"
          } cursor-pointer flex m-auto hover:-translate-x-5 transition-all duration-500 group `}
          onClick={goToPreviousPage}
        >
          <span className="font-black group-hover:opacity-50 opacity-0 transition-all duration-500 top-0 left-1/2 -translate-x-1/2 absolute">
            Zurück
          </span>
          <TbArrowBadgeLeftFilled className="group-hover:text-gray-700 transition-all duration-500 text-8xl" />
        </div>
        <motion.h1
          key={(currentPage, title)}
          transition={transition}
          initial={
            animationDirection === "next"
              ? variants.initialNext
              : variants.initialPrevious
          }
          animate={
            animationDirection === "next"
              ? variants.animateNext
              : variants.animatePrevious
          }
          className="text-2xl sm:text-4xl font-black mx-10 w-5/6 my-auto"
        >
          {title}
        </motion.h1>
        <div
          className={`${
            hasNextPage ? "opacity-100" : "opacity-0"
          } cursor-pointer flex m-auto hover:translate-x-5 transition-all duration-500 group `}
          onClick={goToNextPage}
        >
          <span className="font-black group-hover:opacity-50 opacity-0 transition-all duration-500 left-1/2 -translate-x-1/2 absolute">
            Weiter
          </span>
          <TbArrowBadgeRightFilled className="group-hover:text-gray-700 transition-all duration-500 text-8xl" />
        </div>
      </div>
    </div>
  );
}
export default WordMapTitle;
