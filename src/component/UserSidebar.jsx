import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import LogoutModal from './LogoutModal';
import { BiX } from 'react-icons/bi';
import { useBreakpoint } from '../utils/GetBreakPoint';


const Sidebar = ({ isSidebarOpen, toggleSidebar, setSidebarOpen, SidebarLinks }) => {


    const initailDropStates = SidebarLinks.reduce((acc, items) => {
        if ('dropdown' in items) {
            acc[`is${items.name}Open`] = false
        }
        return acc;
    }, {})
    // console.log('drop status', initailDropStates)

    const [dropDowns, setDropDowns] = useState(initailDropStates)

    const { breakpoint, viewportWidth } = useBreakpoint();
    const [show, setShow] = useState(false);
    // const [isBusinessesOpen, setIsBusinessesOpen] = useState(false);

    const openLogoutModal = () => setShow(true);
    const closeLogoutModal = () => setShow(false);

    const toggleDropDown = (name) => setDropDowns(prev => (
        {
            ...prev,
            [`is${name}Open`]: !prev[`is${name}Open`]
        }
    ));

    const clickOnLink = (linkName) => {
        if (!breakpoint('lg')) {
            toggleSidebar()
        }

        const unToggledDropdowns = Object.keys(dropDowns).reduce((acc, dropDownKey) => {
            if (dropDownKey === `is${linkName}Open`) {
                acc[dropDownKey] = true
            } else {
                acc[dropDownKey] = false
            }

            return acc
        }, {})

        console.log(unToggledDropdowns)

        setDropDowns(unToggledDropdowns)
    }

    // Adjust sidebar visibility on mount based on screen size
    useEffect(() => {
        if (breakpoint('lg')) {
            setSidebarOpen(true); // Open sidebar on large screens
        } else {
            setSidebarOpen(false); // Close sidebar on smaller screens
        }
    }, [viewportWidth]);

    return (
        <>
            {/* Overlay for mobile view */}
            {!breakpoint('lg') && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleSidebar}
                />
            )}

            <nav
                className={`fixed top-16 pb-24 lg:relative z-20 h-screen bg-main_color transition-all duration-300 overflow-y-auto ease-in-out transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}  w-64`}
            >
                {/* Sidebar Links */}
                <ul className="p-4  space-y-4">
                    {SidebarLinks.map((link, index) => {
                        if ('dropdown' in link) {
                            return (
                                <li key={index}>
                                    <button
                                        onClick={() => toggleDropDown(link.name)}
                                        className="flex items-center justify-between w-full text-white p-2 rounded-lg hover:bg-dash_primary focus:outline-none"
                                    >
                                        <span className="flex items-center space-x-2">
                                            <link.icon className="text-lg" />
                                            <span>{link.name}</span>
                                        </span>
                                        <FaCaretDown
                                            className={`transition-transform ${dropDowns[`is${link.name}Open`] ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {dropDowns[`is${link.name}Open`] && (
                                        <div className="mt-2 p-2 text-sm space-y-2 bg-dash_main_color rounded-md">
                                            {link.dropdown.map((dropLink, dropIndex) => (
                                                <Link
                                                    key={dropIndex}
                                                    to={dropLink.path}
                                                    onClick={() => clickOnLink(link.name)}
                                                    className="flex items-center text-white p-2 rounded-lg hover:bg-dash_primary"
                                                >
                                                    <dropLink.icon className="inline mr-2" />
                                                    <span className="truncate whitespace-nowrap overflow-hidden">
                                                        {dropLink.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            )
                        } else {
                            return (
                                // {/* Dashboard Link */ }
                                < li key={index}>
                                    <Link
                                        to={link.path}
                                        onClick={() => clickOnLink(link.name)}
                                        className="flex items-center text-white space-x-2 p-2 rounded-lg hover:bg-dash_primary"
                                    >
                                        <link.icon className="text-lg" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            )
                        }
                    })}




                    {/* Logout Link */}
                    <li>
                        <button
                            onClick={openLogoutModal}
                            className="w-full cursor-pointer flex items-center text-white space-x-2 p-2 rounded-lg hover:bg-dash_primary"
                        >
                            <FaSignOutAlt className="text-lg" />
                            {isSidebarOpen && <span>Logout</span>}
                        </button>
                    </li>
                </ul>
            </nav>

            <LogoutModal show={show} closeModal={closeLogoutModal} />
        </>
    );
};

export default Sidebar;
