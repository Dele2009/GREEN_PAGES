import React from 'react'
import styled from 'styled-components';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

const FooterCarousel = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
  
        responsive:[
          {
            breakpoint: 1024,
            settings:{
              slidesToShow: 4
            },
          },
          {
            breakpoint: 600,
            settings:{
              slidesToShow: 3
            }
          }
        ]
      }
  return (
    <div>
        <Carousel {...settings}>
            <img src='/images/header-logo.jpg'/>
            <img src='/images/logo.png'/>
            <img src='/images/header-logo.jpg'/>
            <img src='/images/logo.png'/>
            <img src='/images/header-logo.jpg'/>
            <img src='/images/logo.png'/>
            <img src='/images/header-logo.jpg'/>
            <img src='/images/logo.png'/>
            <img src='/images/header-logo.jpg'/>
            <img src='/images/logo.png'/>
        </Carousel>
    </div>
  )
}

export default FooterCarousel

const Carousel = styled(Slider)`
    padding-top: 40px;
    padding-bottom: 20px;
    color: #fff;
    cursor: pointer;
    width: 100%;
    padding-right: 30px;

    img{
        width: 70% !important;
        height: 40px;
        padding: 0 50px;

        @media(max-width:600px){
            width: 20%;
            padding: 0 20px;
      }
    }

    ul li button{
        &:before{
            display: none;
        }
        display: none;
    }

    li.slick-active button:before{
        color: white;
        display: none;
    }

    .slick-list{
        overflow: hidden;
    }

    .slick-prev{
      display: none;
    }
    .slick-next{
      display: none;
      right: 0;
    }
    .slick-prev::before{
        display: none;
    }
    .slick-prev::after {
      display: none;
  }
    .slick-next::before{
        display: none;
    }

    .slick-next::after {
      display: none;
    }

`