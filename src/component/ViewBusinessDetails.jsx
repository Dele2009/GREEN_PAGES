import React from 'react'
import { Button, Modal } from 'flowbite-react'
import {
     FaBuilding,
     FaMapMarkerAlt,
     FaPhone,
     FaEnvelope,
     FaGlobe,
     FaUsers,
     FaFlag,
     FaCity,
     FaChartLine,
     FaUserCircle,
     FaTimes,
     FaWhatsapp,
     FaWhatsappSquare,
     FaBusinessTime
} from "react-icons/fa";

const ViewBusinessDetails = ({
     isOpen,
     details,
     onClose
}) => {
     return (
          <>
               <Modal position="center" show={isOpen} onClose={onClose} size="4xl">
                    <Modal.Header>
                         <div className=" text-3xl font-bold flex items-center space-x-2">
                              <FaBuilding className="text-main_color" />
                              <span>Business Details</span>
                         </div>
                    </Modal.Header>
                    <Modal.Body className="bg-white p-6 rounded-b-lg shadow-md">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Owner Name */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaUserCircle className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Owner Name</p>
                                        <p className="text-gray-800">{details.owner_name || 'N/A'}</p>
                                   </div>
                              </div>


                              {/* Company Name */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaBuilding className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Company Name</p>
                                        <p className="text-gray-800">{details.companyname || 'N/A'}</p>
                                   </div>
                              </div>

                              {/* Address */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaMapMarkerAlt className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Address</p>
                                        <p className="text-gray-800">{details.address || 'N/A'}</p>
                                   </div>
                              </div>

                              {/* State */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaFlag className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">State</p>
                                        <p className="text-gray-800">{details.state || 'N/A'}</p>
                                   </div>
                              </div>
                              
                              {/* Local Government */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaFlag className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Local Government</p>
                                        <p className="text-gray-800">{details.localgovernment || 'N/A'}</p>
                                   </div>
                              </div>

                              {/* Town */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaCity className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Town</p>
                                        <p className="text-gray-800">{details.town || 'N/A'}</p>
                                   </div>
                              </div>

                              {/* Category */}
                              <div className="flex col-span-2 items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaBusinessTime className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Category</p>
                                        <p className="text-gray-800">{details.categoryofbusiness || 'N/A'}</p>
                                   </div>
                              </div>


                              {/* Email */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaEnvelope className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Email</p>
                                        <a target='_blank' href={details?.email ? `mailto:${details.email}` : '#'} className="text-main_color underline">{details.email || 'N/A'}</a>
                                   </div>
                              </div>

                              {/* Phone Number */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaPhone className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Phone Number</p>
                                        <a target='_blank' href={details?.phonenumber ? `tel:${details.phonenumber}` : '#'} className="text-main_color underline">{details.phonenumber || 'N/A'}</a>
                                   </div>
                              </div>

                              {/* WhatsApp Number */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaWhatsappSquare className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">WhatsApp Number</p>
                                        <a target='_blank' href={details?.whatsappnumber ? `https://wa.me/${details.whatsappnumber}` : '#'} className="text-main_color underline">{details.whatsappnumber || 'N/A'}</a>
                                   </div>
                              </div>

                              {/* Website */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaGlobe className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Website</p>
                                        <a target='_blank' href={details?.website ? details.website : '#'} className="text-main_color underline">{details.website || 'N/A'}</a>
                                   </div>
                              </div>

                              {/* Staff Strength */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaUsers className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Staff Strength</p>
                                        <p className="text-gray-800">{details.staffstrength || 'N/A'}</p>
                                   </div>
                              </div>

                              {/* Status */}
                              <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                                   <FaChartLine className="text-main_color mr-3 text-3xl" />
                                   <div>
                                        <p className="text-sm font-semibold text-gray-500">Status</p>
                                        <p className="text-gray-800">{details.status || 'N/A'}</p>
                                   </div>
                              </div>

                              

                              <div className="flex flex-col items-center">
                                   <div className="w-full h-[300px] cursor-pointer text-center font-medium  p-3 border border-gray-300 rounded-md bg-gray-100">
                                        <img src={`${import.meta.env.REACT_APP_API_URL}${details.ceoImg}`} alt="CEO" className='h-full w-full rounded-full object-cover' />
                                   </div>
                              </div>

                              <div className="flex flex-col items-center">
                                   <div className="w-full h-[300px] cursor-pointer text-center font-medium  p-3 border border-gray-300 rounded-md bg-gray-100">
                                        <img src={`${import.meta.env.REACT_APP_API_URL}${details.logo}`} alt="Product" className='h-full w-full rounded-md object-cover' />
                                   </div>
                              </div>
                         </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-gray-100 border-t border-gray-200 flex justify-end rounded-b-lg shadow-md">
                         <Button
                              color="light"
                              onClick={onClose}
                              className="font-semibold text-main_color border border-gray-300 hover:bg-gray-200 rounded-md"
                         >
                              <div className='flex items-center justify-center space-x-2'>
                                   <FaTimes />
                                   <span>Close</span>
                              </div>
                         </Button>
                    </Modal.Footer>
               </Modal>
          </>
     )
}

export default ViewBusinessDetails