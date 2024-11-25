import "../assets/body.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterCarousel from "./FooterCarousel";
import { Button, Select, TextInput, Label, Spinner } from "flowbite-react";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";
import { useAppContext } from "../contexts/AppContext";

const Body = () => {
  const { businessCategories, states } = useAppContext();

  const [btn, setBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    searchBy: "business_name",
    searchQuery: "",
    fromState: "all",
  });

  const [notFound, setNotFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => console.log(value), [value]);
  useEffect(
    () => setValue((prev) => ({ ...prev, searchQuery: "" })),
    [value.searchBy, btn]
  );
  // const handleSearchBy = (type) => {
  //   if (type === 'category') {
  //     setIsByName(false)
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotFound(false);
    setLoading(true);

    axios
      .get(`${import.meta.env.REACT_APP_API_URL}/api/find-business/`, {
        params: {
          ...value,
        },
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
        setBtn(true);
        setLoading(false);
        if (response.data.length === 0) setNotFound(true);
      })
      .catch((error) => {
        console.error(error);
        setSearchResults([]);
        setLoading(false);
        setNotFound(true);
      });
  };

  // useEffect(() => {
  //   fetch("https://nigerian-states-and-lga.vercel.app/")
  //     .then((response) => response.json())
  //     .then((data) => setStates(data));
  // }, []);

  return (
    <>
      {!btn ? (
        <div className="body-section flex flex-col items-center justify-center py-10 relative">
          <div className="z-10 rounded-lg p-8 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 order-2 md:order-1"
            >
              <div className="mb-6">
                <h1 className="text-3xl text-center font-bold text-main_color">
                  National GreenPages
                </h1>
                <h3 className="text-lg text-center font-semibold text-white">
                  Business Directory
                </h3>
                <p className="text-white text-center">
                  It is all About Nigeria Businesses
                </p>
                <p className="text-white text-center">(state by state)</p>
              </div>

              <div>
                {/* <Label htmlFor='searchBy' value='Search by:'/> */}
                <Select
                  id="searchBy"
                  name="searchBy"
                  className="block focus:ring-green-500 mt-5"
                  onChange={handleChange}
                >
                  <option value="business_name">Search by business name</option>
                  <option value="business_category">
                    Search by industry/category
                  </option>
                </Select>
              </div>

              {value.searchBy === "business_name" ? (
                <TextInput
                  id="searchBusiness"
                  placeholder="What are you looking for?"
                  name="searchQuery"
                  // ref={myref}
                  value={value.searchQuery}
                  onChange={handleChange}
                  required
                  className="block w-full mt-2 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <>
                  <Select
                    id="state"
                    name="searchQuery"
                    value={value.searchQuery}
                    // className="block focus:ring-green-500 mt-2"
                    onChange={handleChange}
                    // list="businessCategories"
                    required
                    // placeholder="---Choose category---"
                  >
                    {businessCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                  {/* // <input
                  //   id="state"
                  //   name="searchQuery"
                  //   value={value.searchQuery}
                  //   className="block focus:ring-green-500 mt-2"
                  //   onChange={handleChange}
                  //   list="businessCategories"
                  //   required
                  //   placeholder="---Choose category---"
                  // />
                  // <datalist id="businessCategories">
                  //   {businessCategories.map((category, index) => (
                  //     <option key={index} value={category}>
                  //       {category}
                  //     </option>
                  //   ))}
                  // </datalist> */}
                </>
              )}

              <Select
                id="state"
                name="fromState"
                value={value.fromState}
                className="block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 mt-2"
                onChange={handleChange}
              >
                <option value="all">All States</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Select>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-main_color disabled:bg-green-400 text-white mt-4 rounded-md"
              >
                {loading ? (
                  <FaSpinner className="animate-spin text-lg" />
                ) : (
                  "Search"
                )}
              </Button>
            </form>

            <div className="flex items-center justify-center order-1 md:order-2">
              <img
                src="images/logo.png"
                alt="Niger"
                className="max-w-full h-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 w-full max-w-8xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setBtn(false)}
            className="text-green-800 text-xl flex items-center space-x-2 mb-6"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          {notFound ? (
            <div className="text-center p-10 bg-white shadow-md rounded-lg flex flex-col items-center">
              <FaExclamationTriangle className="text-red-600 text-4xl mb-3" />
              <p className="text-red-600 text-xl font-semibold">
                No results found
              </p>
              <p className="text-gray-600">
                Sorry, we couldn’t find any businesses matching your search.
              </p>
              <Button
                className="mt-4 bg-main_color text-white"
                onClick={() => setBtn(false)}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid gap-14 md:grid-cols-2">
              {searchResults.map((searchResult) => (
                <div
                  key={searchResult.id}
                  className="bg-white grid gap-3 grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="">
                    <img
                      src={`${import.meta.env.REACT_APP_API_URL}${
                        searchResult.logo
                      }`}
                      onError={(e) => {
                        e.target.src = "/images/upload.png";
                      }}
                      alt="business-logo"
                      className="h-[300px] md:w-full md:h-full object-fit rounded-md shadow-md"
                    />
                  </div>
                  <div className="">
                    <h3 className="text-lg font-bold text-green-800 mb-2">
                      {searchResult.companyname}
                    </h3>
                    <div className="text-gray-800 space-y-1">
                      <p>
                        <span className="font-bold">Address:</span>{" "}
                        {searchResult.address}
                      </p>
                      <p>
                        <span className="font-bold">Category:</span>{" "}
                        {searchResult.categoryofbusiness || "N/A"}
                      </p>
                      <p>
                        <span className="font-bold">Contact:</span>{" "}
                        {searchResult.phonenumber || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 col-span-2 flex justify-end">
                    <Link
                      to="/contact"
                      className="text-main_color font-semibold underline"
                    >
                      Get more information about this business
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Body;
