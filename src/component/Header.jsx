import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Dropdown, Button } from 'flowbite-react';
import { BiMenu, BiX } from "react-icons/bi";
import Cookies from 'js-cookie';

const Header = () => {
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
    };

    return (
        <Navbar fluid rounded className="bg-white shadow-lg py-4 sticky top-0 px-10 md:px-24 z-[999999]">
            <Navbar.Brand href="/">
                <img src="/images/header-logo.jpg" alt="Logo" className="h-10" />
            </Navbar.Brand>
            <div className="flex md:hidden items-center gap-4">
                <BiMenu size={35} onClick={() => setBurgerStatus(!burgerStatus)} className="text-main_color cursor-pointer" />
            </div>
            <Navbar.Collapse className='m-auto'>
                <Link to="/" className="text-main_color font-semibold hover:text-green-600">Home</Link>
                <Link to="/about" className="text-main_color font-semibold hover:text-green-600">About</Link>
                <Link to="/post" className="text-main_color font-semibold hover:text-green-600">Post your business for free</Link>
                <Link to="/contact" className="text-main_color font-semibold hover:text-green-600">Contact Us</Link>
            </Navbar.Collapse>
            <div className="flex items-center gap-4 hidden md:block">
                {isLoggedIn ? (
                    <Button onClick={handleLogout} color="failure">
                        Logout
                    </Button>
                ) : (
                    <div className="flex items-center gap-2">

                        <Button
                            as={Link}
                            to="/auth/signin"
                            className="!bg-main_color !hover:bg-green-600 !text-white !font-semibold"
                        >
                            Login
                        </Button>

                        {/* Outlined Green Button */}
                        <Button
                            as={Link}
                            to="/auth/signup"
                            className="!bg-transparent !border !border-main_color !text-main_color  !font-semibold"
                        >
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>
            {burgerStatus && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                    <div className="fixed right-0 top-0 w-[30rem] bg-white p-6 z-50">
                        <BiX size={35} onClick={() => setBurgerStatus(false)} className="text-main_color mb-6 cursor-pointer" />
                        <Link to="/" className="block mb-4 text-xl text-main_color hover:text-green-600">Home</Link>
                        <Link to="/about" className="block mb-4 text-xl text-main_color hover:text-green-600">About</Link>
                        <Link to="/post" className="block mb-4 text-xl text-main_color hover:text-green-600">Post your business for free</Link>
                        <Link to="/contact" className="block mb-4 text-xl text-main_color hover:text-green-600">Contact Us</Link>
                        {isLoggedIn ? (
                            <Button onClick={handleLogout} color="failure" pill className="mt-4 w-full">
                                Logout
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 px-2">

                                <Button
                                    as={Link}
                                    to="/auth/signin"
                                    className="!bg-main_color !hover:bg-green-600 !text-white !font-semibold w-full"
                                >
                                    Login
                                </Button>

                                {/* Outlined Green Button */}
                                <Button
                                    as={Link}
                                    to="/auth/signup"
                                    className="!bg-transparent !border !border-main_color !text-main_color  !font-semibold w-full"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Navbar>
    );
};

export default Header;
