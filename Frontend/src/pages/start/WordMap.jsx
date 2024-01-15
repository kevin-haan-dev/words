import { useWordMapContext } from "../../context/WordMapContext";
import WordMapTitle from "./WordMapTitle";
import WordMapSorting from "./WordMapSorting";
import Pagination from "./Pagination";
import Word from "./Word";
import WordModal from "./WordModal";

function WordMap() {
  const { posts, sortOption } = useWordMapContext();

  const sortWordMap = (wordMap) => {
    const sortedEntries = Object.entries(wordMap).sort((a, b) => {
      if (sortOption === "alphabet") {
        return a[0].localeCompare(b[0]);
      } else {
        return b[1] - a[1];
      }
    });
    return Object.fromEntries(sortedEntries);
  };

  const renderWordMapItems = (wordMap) => {
    const sortedWordMap = sortWordMap(wordMap);
    return Object.entries(sortedWordMap).map(([word, count]) => (
      <Word key={word} word={word} count={count} />
    ));
  };

  return (
    <>
      {posts.map(([title, wordMap], index) => (
        <div className="text-center" key={index} id={`wordmap-${index}`}>
          <Pagination />
          <WordMapTitle
            title={title}
            index={index}
            postsLength={posts.length}
          />
          <WordMapSorting />

          <div className="flex flex-wrap mt-10 sm:mt-20">
            {renderWordMapItems(wordMap)}
          </div>
        </div>
      ))}
      <WordModal />
    </>
  );
}

export default WordMap;
