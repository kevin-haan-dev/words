import Header from "./Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="app-background text-white">
      <main className="flex flex-col mx-10 sm:mx-20 md:mx-40 lg:mx-80 py-40 min-h-screen min-w-screen">
        <Outlet />
      </main>
      <Header />
    </div>
  );
}

export default Layout;
