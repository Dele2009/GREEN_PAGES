import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/header.css';
import styled from 'styled-components';
// import MenuIcon from '@material-ui/icons/Menu';
// import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'js-cookie';

const Header = () => {
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token')
        setIsLoggedIn(false)
    };

    return (
        <div className='head'>
            <div className='header1'>
                <div className='logo'>
                    <Link to='/'><img src='/images/header-logo.jpg' alt="Logo" /></Link>
                </div>

                <div className='header-link2'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/post'>Post your business for free</Link>
                    <Link to='/contact'>Contact Us</Link>
                </div>
                <div className='link'>
                    <img src='images/profile.png' alt="Profile" />
                    {isLoggedIn ? (
                        <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                    ) : (
                        <>
                            <Link to='/signin' style={{ marginLeft: '-1px' }}>Log In</Link> /
                            <Link to='/signup'>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
            <div className='burgernav'>
                <RightMenu>
                    {/* <CustomMenu onClick={() => setBurgerStatus(true)} /> */}
                </RightMenu>
                <BurgerNav show={burgerStatus}>
                    <CloseWrapper>
                        {/* <CustomClose onClick={() => setBurgerStatus(false)} /> */}
                    </CloseWrapper>
                    <Link to='/'><a href='#'>Home</a></Link>
                    <Link to='/about'><a href='#'>About Us</a></Link>
                    <Link to='/post'><a href='#'>Post your business for free</a></Link>
                    <Link to='/contact'><a href='#'>Contact Us</a></Link>

                    <Head>
                        <Link to='/signin'><img src='images/profile.png' alt="Profile" /></Link>
                        <Link to='/signin'>Log In</Link>
                        <p style={{ marginBottom: '-5px' }}>/</p>
                        <Link to='/signup'>Sign Up</Link>
                    </Head>
                </BurgerNav>
            </div>
        </div>
    );
}

export default Header;

const RightMenu = styled.div`
    display: flex;
    align-items: center;
    a {
        text-transform: uppercase;
        margin-right: 10px;
    }
`;

// const CustomMenu = styled(MenuIcon)`
//     cursor: pointer;
// `;

const BurgerNav = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    width: 300px;
    list-style: none;
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: start;
    transform: ${props => props.show ? 'translateX(0%)' : 'translateX(100%)'};
    transition: transform cubic-bezier(0.175, 0.885, 0.32, 1.275);

    a {
        font-size: 18px;
        margin-top: 20px;
        padding: 10px 10px;
        text-decoration-line: none !important;
        color: rgb(2, 80, 35);
    }
`;

const Head = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
        color: rgb(2, 80, 35);
        font-size: 18px;
        font-weight: 500;
    }
    img {
        width: 35px;
    }
`;

// const CustomClose = styled(CloseIcon)`
//     cursor: pointer;    
// `;

const CloseWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 18px 25px;
`;
