import router from "./Router";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer
        transition={Slide}
        position="top-right"
        pauseOnFocusLoss={false}
        draggable
        progressClassName="toast-progress-bar"
      />

      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
