import { useWordMapContext } from "../../context/WordMapContext";

function Pagination() {
  const { totalPosts, currentPage, setCurrentPage, postsPerPage } =
    useWordMapContext();

  const pageNumbers = Array.from(
    { length: Math.ceil(totalPosts / postsPerPage) },
    (_, i) => i + 1
  );

  const isActive = (pageNumber) => pageNumber === currentPage;

  return (
    <div className="sm:w-1/2 flex flew-wrap justify-between mx-auto">
      {pageNumbers.map((number) => (
        <div
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`${
            isActive(number) ? "bg-white text-slate-800 bg-opacity-100" : ""
          } flex flex-wrap bg-opacity-0 w-10 h-10 rounded-full hover:text-slate-600 bg-white  hover:bg-opacity-100 duration-300 cursor-pointer`}
        >
          <div className="m-auto font-black">{number}</div>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
