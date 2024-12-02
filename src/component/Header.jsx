import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Dropdown, Button } from 'flowbite-react';
import { BiMenu, BiX } from "react-icons/bi";
import Cookies from 'js-cookie';
import { useBreakpoint } from '../utils/GetBreakPoint';
import { FaCaretDown, FaSignOutAlt } from 'react-icons/fa';
import LogoutModal from './LogoutModal';

const Header = () => {
    const { breakpoint } = useBreakpoint()
    const [email, setEmail] = useState('')
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const toggleModal = ()=> setShowLogout(prev => !prev)

    useEffect(() => {
        const token = Cookies.get('token');
        setEmail(Cookies.get('email'))
        setIsAdmin(Cookies.get('is_staff') === 'true');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        // setIsLoggedIn(false);
    };

    // const DashBoardRoute = () => {

    // }

    return (
        <Navbar fluid rounded className="bg-white shadow-lg py-4 sticky top-0 px-4 md:px-7 lg:px-24 z-[999]">
            <Navbar.Brand href="/">
                <img src="/images/header-logo.jpg" alt="Logo" className="h-8 sm:h-10" />
            </Navbar.Brand>
            <div className="flex lg:hidden items-center gap-4">
                <BiMenu size={35} onClick={() => setBurgerStatus(!burgerStatus)} className="text-main_color cursor-pointer" />
            </div>
            <Navbar.Collapse className='m-auto !hidden lg:!block'>
                <Link to="/" className="text-main_color font-semibold hover:text-green-600">Home</Link>
                <Link to="/about" className="text-main_color font-semibold hover:text-green-600">About</Link>
                <Link to="/post" className="text-main_color font-semibold hover:text-green-600">Post your business for free</Link>
                <Link to="/contact" className="text-main_color font-semibold hover:text-green-600">Contact Us</Link>
            </Navbar.Collapse>
            <div className="flex items-center gap-4 hidden lg:block">
                {isLoggedIn ? (
                    <>
                        <Dropdown
                            dismissOnClick={true}
                            renderTrigger={() => (
                                <div className='border border-black w-[100px] cursor-pointer text-main_color p-2 rounded-md flex items-center justify-center gap-3'>
                                    <span
                                        className="truncate whitespace-nowrap overflow-hidden"
                                    >
                                        Hi, {email}
                                    </span>
                                    <FaCaretDown />
                                </div>
                            )}>
                                <Dropdown.Item  as={Link} to={`/${isAdmin ? 'admin' : 'member'}/dashboard`}>Dashboard</Dropdown.Item>
                            <Dropdown.Item>
                                <Button onClick={toggleModal} className='w-full flex justify-center items-center' color="failure">
                                    <FaSignOutAlt className="mr-4 size-5" />
                                    <span>
                                        Logout
                                    </span>
                                </Button>
                            </Dropdown.Item>
                        </Dropdown>
                        {/* <Button onClick={handleLogout} color="failure">
                            Logout
                        </Button> */}
                    </>
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
            {burgerStatus && !breakpoint('lg') && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                    <div className="fixed right-0 top-0 w-full max-w-[30rem] bg-white p-6 z-50">
                        <BiX size={35} onClick={() => setBurgerStatus(false)} className="text-main_color mb-6 cursor-pointer ml-auto" />
                        <Link onClick={() => setBurgerStatus(false)} to="/" className="block mb-4 text-xl text-main_color hover:text-green-600">Home</Link>
                        <Link onClick={() => setBurgerStatus(false)} to="/about" className="block mb-4 text-xl text-main_color hover:text-green-600">About</Link>
                        <Link onClick={() => setBurgerStatus(false)} to="/post" className="block mb-4 text-xl text-main_color hover:text-green-600">Post your business for free</Link>
                        <Link onClick={() => setBurgerStatus(false)} to="/contact" className="block mb-4 text-xl text-main_color hover:text-green-600">Contact Us</Link>
                        {isLoggedIn ? (
                            <Dropdown
                                dismissOnClick={true}
                                renderTrigger={() => (
                                    <div className='border border-black w-full cursor-pointer text-main_color p-2 rounded-md flex items-center justify-center gap-3'>
                                        <span
                                            className="truncate whitespace-nowrap overflow-hidden"
                                        >
                                            Hi, {email}
                                        </span>
                                        <FaCaretDown />
                                    </div>
                                )}>
                                <Dropdown.Item onClick={() => setBurgerStatus(false)} as={Link} to={`/${isAdmin ? 'admin' : 'member'}/dashboard`}>Dashboard</Dropdown.Item>
                                <Dropdown.Item>
                                    <Button onClick={() => { toggleModal(); setBurgerStatus(false) }} className='w-full flex justify-center items-center' color="failure">
                                        <FaSignOutAlt className="mr-4 size-5" />
                                        <span>
                                            Logout
                                        </span>
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <div className="flex items-center gap-2 px-2">

                                <Button onClick={() => setBurgerStatus(false)}
                                    as={Link}
                                    to="/auth/signin"
                                    className="!bg-main_color !hover:bg-green-600 !text-white !font-semibold w-full"
                                >
                                    Login
                                </Button>

                                {/* Outlined Green Button */}
                                <Button onClick={() => setBurgerStatus(false)}
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

            <LogoutModal closeModal={toggleModal} show={showLogout} />
        </Navbar>
    );
};

export default Header;
