import TechStack from "./TechStack";
import Info from "./Info";

function About() {
  return (
    <div className="flex flex-col gap-60 py-20">
      <Info />
      <TechStack />
    </div>
  );
}

export default About;
