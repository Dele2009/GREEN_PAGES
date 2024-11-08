import React from 'react'
import '../assets/about.css'

const About = () => {
  return (
    <div className='about-container'>
        <div className='about'>
            <div className='about-content'>
                <div className='sub-content'>
                    <h1>About Us</h1>
                    <p>Greenpages Dynamic World Ltd the publisher of National Greenpages
                    Business Directory is an organization whose focus is on Africa's growth and development.
                    Its special interest is on how Africans both home and in Diaspora will build and develop thier continent.
                    This company was established to encourage foreign investors to invest in the continent of Africa. </p>
                    
                    <p>Established in the late 90s, the company has spread its tentacles across the world with its agents in various
                    countries, these include Ghana, United Kingdom, United States of America. With trusted and experienced hands.
                    With trusted and experienced hands working hard globally, we believe with even you,
                    Africa will be a more comfortable continent for all of us to live in and thrive.</p>
                </div>
                <div className='v-m'>
                    <div className='vision'>
                        <h1>OUR VISION</h1>
                        <p>We are committed to creating a global business consortium, that will serve as a gateway to facilitating 
                        investments both in Nigeria and the Africa Continent as a whole. In line with this perspective
                        our company provides a platform that will foster networking and e-business services in Africa 
                        than ever before, by creating a robust business links that stands on the pillars of trust,
                        honesty and efficiency.</p>
                    </div>

                    <div className='mission'>
                        <h1>OUR MISSION</h1>
                        <p>To Deliver excellent and invaluable business services at all times is our mantra,
                        we take the risk while our customer take the pleasure. We exist to provide,  <b style={{color:'rgb(11, 106, 11)'}}>State by States Business Directory to the people of
                        Federal Republic of Nigeria</b></p>
                    </div>
                 </div>
            </div>
            <div className='about-image'>
                <img src='/images/logo.png'/>
            </div>
        </div>
    </div>
  )
}

export default About