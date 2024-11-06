import '../assets/body.css';
import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterCarousel from './FooterCarousel';


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
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setSearchResults(response.data);
        if (response.data.length === 0) {
          setNotFound(true);
        }
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
    <div>
      <Header />
      {
        btn ? null :
          <div className='body-section'>
            <div className='body-container'>
              <form className='inputs' onSubmit={handleSubmit}>
                <div className='body-content'>
                  <h1>National GreenPages</h1>
                  <h3>Business Directory</h3>
                  <p>it is all About Nigeria Businesses (state by state) </p>
                </div>
                <select onChange={handleChange}>
                  <option value="option2">All Categories</option>
                  <option value="option3">search by business name</option>
                  <option value="option4">search by nature of business industry/category</option>
                </select>
                <input placeholder='What are you looking for?' name='searchBusiness' ref={myref} onChange={handleChange} />
                <select onChange={handleChange} name='select' value={value.select}>
                  <option value="">All States</option>
                  {states.map((state) => (
                    <option key={state.name} value={state.name}>{state.name}</option>
                  ))}
                </select>
                <button type='submit' name='search'>Search</button>
              </form>
              <div className='side-img'>
                <img src='images/logo.png' alt="Niger" />
              </div>
            </div>
            <FooterCarousel />
          </div>
      }
      {
        btn ?
          <div className='search-result'>
            <div className='back-img'>
              <img src='images/arow.png' onClick={() => setBtn(false)} alt="Back" />
            </div>
            {
              notFound ?
                <p style={{ textAlign: 'center', color: 'red', fontSize: '28px' }}>Search not found</p>
                :
                searchResults.map((searchResult) => (
                  <div className='search' key={searchResult.id}>
                    <h3 style={{ fontSize: '28px', color: 'rgb(28, 104, 60)' }}>Company Name: <span style={{ fontSize: '24px', letterSpacing: '1px', fontWeight: '400', color: 'black' }}>{searchResult.companyname}</span></h3>
                    <h3 style={{ fontSize: '28px', color: 'rgb(28, 104, 60)' }}>Address: <span style={{ fontSize: '24px', letterSpacing: '1px', fontWeight: '400', color: 'black' }}>{searchResult.address}</span></h3>
                    <p>get full information about this business: <Link to='/contact'>contact us</Link></p>
                  </div>
                ))
            }
          </div> : null
      }
      <Footer />
    </div>
  );
}

export default Body;