import { SiRabbitmq } from "react-icons/si";
import { SiScala } from "react-icons/si";
import TechnologyCard from "./TechnologyCard";
function TechStackSection({ title, children }) {
  return (
    <div>
      <h2 className="text-3xl font-black mb-10 text-center">{title}</h2>
      <div className="flex flex-wrap gap-10 ">{children}</div>
    </div>
  );
}

export default TechStackSection;
