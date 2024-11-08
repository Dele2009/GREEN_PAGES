import '../assets/body.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterCarousel from './FooterCarousel';
import { Button, Select, TextInput, Label } from 'flowbite-react';

const Body = () => {
  const [btn, setBtn] = useState(false);
  const [value, setValue] = useState({
    searchBusiness: '',
    select: '',
    search: ''
  });
  const [states, setStates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const myref = useRef();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtn(true);
    setNotFound(false);

    axios.get(`${import.meta.env.REACT_APP_API_URL}/api/find-business/?search=${myref.current.value}`, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        setSearchResults(response.data);
        if (response.data.length === 0) setNotFound(true);
      })
      .catch((error) => {
        console.error(error);
        setSearchResults([]);
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
      {
        !btn ? (
          <div className="body-section flex flex-col items-center justify-center py-10 relative">
            {/* Overlay Section */}
            {/* <div className="bg-cover bg-center absolute inset-0 opacity-30"></div> */}
            <div className="z-10 shadow-lg rounded-lg p-8 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-main_color">National GreenPages</h1>
                  <h3 className="text-lg font-semibold text-black">Business Directory</h3>
                  <p className="text-white">It is all About Nigeria Businesses (state by state)</p>
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

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white mt-4 rounded-md">Search</Button>
              </form>

              <div className="hidden items-center justify-center md:flex">
                <img src="images/logo.png" alt="Niger" className="max-w-full h-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            <button onClick={() => setBtn(false)} className="text-green-800 flex items-center space-x-2 mb-6">
              <img src="images/arrow.png" alt="Back" className="w-6 h-6" />
              <span>Back</span>
            </button>
            {notFound ? (
              <p className="text-center text-red-600 text-lg font-semibold">No results found</p>
            ) : (
              searchResults.map((searchResult) => (
                <div key={searchResult.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-bold text-green-800">Company Name: <span className="text-black font-normal">{searchResult.companyname}</span></h3>
                  <h3 className="text-lg font-bold text-green-800">Address: <span className="text-black font-normal">{searchResult.address}</span></h3>
                  <p className="text-gray-700">
                    Get full information about this business: <Link to="/contact" className="text-green-600 underline">Contact us</Link>
                  </p>
                </div>
              ))
            )}
          </div>
        )
      }
    </>

  );
};

export default Body;
