import { useWordMapContext } from "../../context/WordMapContext";
import WordMap from "./WordMap";
import Loading from "./Loading";

function Start() {
  const { posts } = useWordMapContext();

  return <div className="">{posts.length ? <WordMap /> : <Loading />}</div>;
}

export default Start;
