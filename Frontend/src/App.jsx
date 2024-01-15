import router from "./Router";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer
        transition={Slide}
        position="top-center"
        pauseOnFocusLoss={false}
        draggable
        progressClassName="toast-progress-bar"
        containerClassName="toast-container"
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
