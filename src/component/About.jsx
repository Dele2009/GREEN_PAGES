import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto grid place-items-center gap-20 grid-cols-1 lg:grid-cols-2 px-6 md:px-10">
        {/* About Content */}
        <div className=" space-y-8 order-2 lg:order-1">
          {/* Intro Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-main_color">About Us</h1>
            <p className="text-gray-600 leading-relaxed">
              Greenpages Dynamic World Ltd, the publisher of National Greenpages
              Business Directory, is an organization focused on Africa's growth
              and development. With a special interest in encouraging Africans,
              both at home and abroad, to build and develop the continent, we
              aim to promote foreign investment in Africa.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Established in the late 90s, the company has a global presence
              with agents in Ghana, the United Kingdom, and the United States.
              With experienced teams working globally, we believe that,
              together, we can make Africa a more comfortable and thriving place
              for all.
            </p>
          </div>

          {/* Vision and Mission Section */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Vision */}
            <div>
              <h2 className="text-3xl font-semibold text-main_color mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We aim to create a global business consortium that serves as a
                gateway for investments in Nigeria and the African continent.
                Our platform fosters networking and e-business services, built
                on pillars of trust, honesty, and efficiency, to make business
                connections in Africa stronger than ever before.
              </p>
            </div>

            {/* Mission */}
            <div>
              <h2 className="text-3xl font-semibold text-main_color mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To deliver excellent and invaluable business services
                consistently. We take the risks, so our customers enjoy the
                benefits. Our mission is to provide a{" "}
                <Link
                  to="#"
                  className="text-dash_primary font-semibold underline"
                >
                  State by State Business Directory
                </Link>{" "}
                for the people of the Federal Republic of Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 lg:order-2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
