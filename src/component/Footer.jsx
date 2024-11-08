import '../assets/footer.css'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Footer = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } }
    ]
  };
  return (
    <>
      <div className="w-full h-[100px] mt-8">
        <Slider className='m-0' {...carouselSettings}>
          <div><img src="/images/header-logo.jpg" alt="Carousel Item" className="h-[50px] mx-auto" /></div>
          <div><img src="/images/logo.png" alt="Carousel Item" className="h-[50px] mx-auto" /></div>
          <div><img src="/images/header-logo.jpg" alt="Carousel Item" className="h-[50px] mx-auto" /></div>
          <div><img src="/images/logo.png" alt="Carousel Item" className="h-[50px] mx-auto" /></div>
        </Slider>
      </div>
    <div className='footer'>
      <p>Copyright Greenpages Dynamic World Ltd; the publisher of National GreenPages Business Directory. All Rights Reserved</p>
    </div>
    </>
  )
}

export default Footer