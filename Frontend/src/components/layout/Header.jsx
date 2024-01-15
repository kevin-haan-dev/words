import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu from "../../menu";
import logo from "../../assets/images/logo/words_logo.svg";
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-10 fixed top-0 left-0 w-full transition-all duration-500 px-20 ${
        isScrolled ? "py-5 backdrop-blur-xl bg-opacity-30 shadow-lg" : "py-14"
      }`}
    >
      <nav className="flex">
        <Link to="/">
          <img src={logo} className="w-32" alt="words" />
        </Link>

        <div className="ml-auto flex gap-10 uppercase font-black opacity-50 text-white my-auto">
          {menu.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-gray-700 duration-300 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Header;
