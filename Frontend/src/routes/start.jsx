import Start from "../pages/start/Start";
import { WordMapProvider } from "../context/WordMapContext";

const startRoutes = [
  {
    path: "/",
    element: (
      <WordMapProvider>
        <Start />
      </WordMapProvider>
    ),
  },
];

export default startRoutes;
