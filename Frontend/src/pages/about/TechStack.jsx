import {
  SiRabbitmq,
  SiScala,
  SiFramer,
  SiTailwindcss,
  SiNginx,
  SiDocker,
  SiVitest,
  SiJest,
} from "react-icons/si";
import { TbBrandNodejs } from "react-icons/tb";
import { LiaReact } from "react-icons/lia";
import TechnologyCard from "./TechnologyCard";
import TechStackSection from "./TechStackSection";

function TechStack() {
  const techStack = [
    {
      title: "Backend",
      technologies: [
        { icon: <SiScala />, name: "Scala", description: "Collecting Data" },
        {
          icon: <TbBrandNodejs />,
          name: "Node.js",
          description: "Processing Data",
        },
        {
          icon: <TbBrandNodejs />,
          name: "Node.js",
          description: "WebSocket Server",
        },
        {
          icon: <SiRabbitmq />,
          name: "RabbitMQ",
          description: "Message Broker",
        },
      ],
    },
    {
      title: "Frontend",
      technologies: [
        { icon: <LiaReact />, name: "React", description: "Framework" },
        { icon: <SiFramer />, name: "Framer Motion", description: "Animation" },
        { icon: <SiTailwindcss />, name: "Tailwind", description: "Styling" },
      ],
    },
    {
      title: "DevOps",
      technologies: [
        { icon: <SiNginx />, name: "NGINX", description: "Reverse Proxy" },
        { icon: <SiDocker />, name: "Docker", description: "Containerization" },
      ],
    },
    {
      title: "Testing",
      technologies: [
        { icon: <SiJest />, name: "Jest", description: "Backend Testing" },
        { icon: <SiVitest />, name: "Vitest", description: "Frontend Testing" },
      ],
    },
  ];

  return (
    <div>
      <h1 className="font-black  text-5xl tracking-tight text-center mb-20">
        Tech Stack
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {techStack.map((stack, index) => (
          <TechStackSection key={index} title={stack.title}>
            {stack.technologies.map((tech, index) => (
              <TechnologyCard
                key={tech.name}
                icon={tech.icon}
                name={tech.name}
                description={tech.description}
                index={index}
              />
            ))}
          </TechStackSection>
        ))}
      </div>
    </div>
  );
}

export default TechStack;
