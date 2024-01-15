import ZoomInAnimation from "../../components/animation/ZoomInAnimation";
import { RiTestTubeFill } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { TbSettingsCog } from "react-icons/tb";
function Info() {
  const data = [
    {
      count: 4,
      title: "Services integriert",
      icon: <TbSettingsCog />,
    },
    {
      count: 6,
      title: "Container gebaut",
      icon: <FiBox />,
    },
    {
      count: 16,
      title: "Tests geschrieben",
      icon: <RiTestTubeFill />,
    },
  ];

  return (
    <div>
      <div className="text-6xl font-black text-center mb-20">
        <div>Für diese Anwendung wurden...</div>
      </div>
      <div className="grid grid-cols-1 gap-20">
        {data.map((item) => (
          <div key={item.title}>
            <div className="font-black text-xl text-center mb-10">
              {item.count} {item.title}
            </div>
            <ZoomInAnimation count={item.count}>
              <div className="text-3xl opacity-50">{item.icon}</div>
            </ZoomInAnimation>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;
