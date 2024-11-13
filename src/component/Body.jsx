import '../assets/body.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterCarousel from './FooterCarousel';
import { Button, Select, TextInput, Label, Spinner } from 'flowbite-react';
import { FaArrowLeft, FaExclamationTriangle, FaSearch } from 'react-icons/fa';

const Body = () => {
  const [btn, setBtn] = useState(false);
  const [value, setValue] = useState({
    searchBusiness: '',
    select: '',
    search: ''
  });
  const [states, setStates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const myref = useRef();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtn(true);
    setNotFound(false);
    setLoading(true);

    axios.get(`${import.meta.env.REACT_APP_API_URL}/api/find-business/?search=${myref.current.value}`, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        setSearchResults(response.data);
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

  useEffect(() => {
    fetch('https://nigerian-states-and-lga.vercel.app/')
      .then((response) => response.json())
      .then((data) => setStates(data));
  }, []);

  return (
    <>
      {!btn ? (
        <div className="body-section flex flex-col items-center justify-center py-10 relative">
          <div className="z-10 shadow-lg rounded-lg p-8 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="space-y-6 order-2 md:order-1">
              <div className="mb-6">
                <h1 className="text-3xl text-center font-bold text-main_color">National GreenPages</h1>
                <h3 className="text-lg text-center font-semibold text-white">Business Directory</h3>
                <p className="text-white text-center">It is all About Nigeria Businesses</p>
                <p className="text-white text-center">(state by state)</p>
              </div>

              <div>
                <Select
                  id="category"
                  name="select"
                  className="block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  onChange={handleChange}
                >
                  <option value="option2">All Categories</option>
                  <option value="option3">Search by business name</option>
                  <option value="option4">Search by industry/category</option>
                </Select>
              </div>

              <TextInput
                id="searchBusiness"
                placeholder="What are you looking for?"
                name="searchBusiness"
                ref={myref}
                onChange={handleChange}
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
              />

              <Select
                id="state"
                name="select"
                value={value.select}
                className="block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 mt-2"
                onChange={handleChange}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>{state.name}</option>
                ))}
              </Select>

              <Button type="submit" className="w-full bg-main_color text-white mt-4 rounded-md">Search</Button>
            </form>

            <div className="flex items-center justify-center order-1 md:order-2">
              <img src="images/logo.png" alt="Niger" className="max-w-full h-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          {/* Back Button */}
          <button onClick={() => setBtn(false)} className="text-green-800 flex items-center space-x-2 mb-6">
            <FaArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner size="xl" color="green" aria-label="Loading search results" />
            </div>
          ) : (
            <>
              {/* No Results Found Message */}
              {notFound ? (
                <div className="text-center p-10 bg-white shadow-md rounded-lg flex flex-col items-center">
                  <FaExclamationTriangle className="text-red-600 text-4xl mb-3" />
                  <p className="text-red-600 text-xl font-semibold">No results found</p>
                  <p className="text-gray-600">Sorry, we couldn’t find any businesses matching your search.</p>
                  <Button
                    className="mt-4 bg-main_color text-white"
                    onClick={() => setBtn(false)}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {searchResults.map((searchResult) => (
                    <div key={searchResult.id} className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl">
                      <h3 className="text-lg font-bold text-green-800 mb-1">
                        {searchResult.companyname}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{searchResult.address}</p>
                      <div className="text-gray-800 space-y-1">
                        <p><span className="font-bold">Category:</span> {searchResult.category || 'N/A'}</p>
                        <p><span className="font-bold">Contact:</span> {searchResult.contact || 'N/A'}</p>
                      </div>
                      <div className="mt-4">
                        <Link
                          to="/contact"
                          className="text-main_color font-semibold underline"
                        >
                          Get full information about this business
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Body;
