import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Header = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const searchChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search/${searchValue}`);
    setSearchValue("");
  };

  return (
    <>
      <div className="fixed w-full z-50	bg-indigo-700 top-0">
        <nav className="flex max-w-6xl mx-auto  top-0 items-center justify-between flex-wrap  p-6">
          <div className="flex  items-center flex-shrink-0 text-white mr-6">
            <span className="font-black text-xl tracking-tight text-pink-500">
              <Link to="/">
                <span className="font-hairline text-white">React |</span> Movie
              </Link>
            </span>
          </div>
          <div className="flex flex-row items-center flex-shrink-0 ">
            <form
              className="flex flex-row items-center flex-shrink-0 "
              onSubmit={handleSubmit}
            >
              <input
                className="bg-white focus:outline-none focus:shadow-outline h-10 border border-gray-300 rounded-lg rounded-r-none py-2 px-4 block w-full appearance-none leading-normal"
                placeholder="Search a movie..."
                value={searchValue}
                onChange={searchChange}
              />
              <input
                type="submit"
                value="Submit"
                className="bg-pink-500 border-pink-500hover:bg-pink-700 text-white font-bold py-2 px-4 rounded rounded-l-none"
              />
            </form>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
