import { useRef } from "react";
import { useInView, LazyMotion, domAnimation, m } from "framer-motion";

function TechnologyCard({ icon, name, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="flex-grow flex-shrink-0 basis-1/3 bg-white bg-opacity-10 rounded-xl text-center flex flex-col p-5"
      >
        <div className="text-5xl m-auto">{icon}</div>
        <div className="font-black my-3">{name}</div>
        <div className="text-sm">{description}</div>
      </m.div>
    </LazyMotion>
  );
}

export default TechnologyCard;
