import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import WebSocketService from "../services/WebSocketService";
import { useMemo } from "react";
import { toast } from "react-toastify";

export const WordMapContext = createContext();

export const WordMapProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("alphabet");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [selectedWord, setSelectedWord] = useState(null);

  const host = window.location.hostname;
  const port = window.location.port;

  const url = `ws://${host}:${port}/words`;
  // const url = `ws://localhost:5003/`;

  const webSocketService = useMemo(() => new WebSocketService(url), [url]);

  const onMessage = useCallback((event) => {
    const postData = Object.entries(JSON.parse(event.data));
    setPostData(postData);
  }, []);

  const paginatePosts = useCallback(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);
    setTotalPosts(postData.length);
    setPosts(currentPosts);
  }, [currentPage, postsPerPage, postData]);

  const onError = useCallback((event) => {
    toast("Fehler beim Verbinden mit WebSocket");
    console.log(event);
  }, []);

  const onOpen = useCallback(() => {
    toast("WebSocket verbunden");
  }, []);

  useEffect(() => {
    paginatePosts();
  }, [currentPage, postsPerPage, postData, paginatePosts]);

  useEffect(() => {
    webSocketService.connect(onMessage, onError, onOpen);
  }, [webSocketService, onMessage, onError, onOpen]);

  const contextValue = useMemo(
    () => ({
      posts,
      sortOption,
      setSortOption,
      currentPage,
      setCurrentPage,
      postsPerPage,
      setPostsPerPage,
      totalPosts,
      selectedWord,
      setSelectedWord,
    }),
    [
      posts,
      sortOption,
      currentPage,
      setCurrentPage,
      postsPerPage,
      setPostsPerPage,
      totalPosts,
      selectedWord,
      setSelectedWord,
    ]
  );

  return useMemo(
    () => (
      <WordMapContext.Provider value={contextValue}>
        {children}
      </WordMapContext.Provider>
    ),
    [contextValue, children]
  );
};

export const useWordMapContext = () => useContext(WordMapContext);
