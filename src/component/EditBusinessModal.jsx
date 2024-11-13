import {
     FaEdit,
     FaTrash,
     FaEye,
     FaExclamationTriangle,
     FaBoxOpen,
     FaSpinner,
     FaPlusSquare,
     FaBuilding,
     FaMapMarkerAlt,
     FaUser,
     FaPhone,
     FaEnvelope,
     FaGlobe,
     FaUsers,
     FaFlag,
     FaCity,
     FaChartLine,
     FaUserCircle,
     FaSave,
     FaTimes
} from "react-icons/fa";

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FaArrowsRotate } from "react-icons/fa6";
import { Modal, Button, Spinner, Table, Label } from "flowbite-react";



const EditBusinessModal = ({
     isOpen,
     closeModal,
     details,
     onTextFieldChange,
     onFileFieldChange,
     onSaveChanges,
     imagePreview
}) => {
     return (
          <Modal position="center" show={isOpen} size="5xl" onClose={closeModal}>
               <Modal.Header className="bg-gray-100 border-b border-gray-200 text-lg  font-semibold text-gray-700 ">
                    <div className="flex items-center space-x-2">
                         <FaBuilding className="text-main_color" />
                         <span>Edit Business Details</span>
                    </div>
               </Modal.Header>
               <Modal.Body className="bg-gray-50 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                         {/* Company Name */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaBuilding className="text-main_color" />
                                   <span>Company Name</span>
                              </label>
                              <input
                                   type="text"
                                   name="companyname"
                                   value={details.companyname || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Address */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaMapMarkerAlt className="text-main_color" />
                                   <span>Address</span>
                              </label>
                              <input
                                   type="text"
                                   name="address"
                                   value={details.address || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Local Government */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaFlag className="text-main_color" />
                                   <span>Local Government</span>
                              </label>
                              <input
                                   type="text"
                                   name="localgovernment"
                                   value={details.localgovernment || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Town */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaCity className="text-main_color" />
                                   <span>Town</span>
                              </label>
                              <input
                                   type="text"
                                   name="town"
                                   value={details.town || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* State */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaFlag className="text-main_color" />
                                   <span>State</span>
                              </label>
                              <input
                                   type="text"
                                   name="state"
                                   value={details.state || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Email */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaEnvelope className="text-main_color" />
                                   <span>Email</span>
                              </label>
                              <input
                                   type="email"
                                   name="email"
                                   value={details.email || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Phone Number */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaPhone className="text-main_color" />
                                   <span>Phone Number</span>
                              </label>
                              <input
                                   type="text"
                                   name="phonenumber"
                                   value={details.phonenumber || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* WhatsApp Number */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaPhone className="text-main_color" />
                                   <span>WhatsApp Number</span>
                              </label>
                              <input
                                   type="text"
                                   name="whatsappnumber"
                                   value={details.whatsappnumber || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Website */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaGlobe className="text-main_color" />
                                   <span>Website</span>
                              </label>
                              <input
                                   type="url"
                                   name="website"
                                   value={details.website || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Staff Strength */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaUsers className="text-main_color" />
                                   <span>Staff Strength</span>
                              </label>
                              <input
                                   type="text"
                                   name="staffstrength"
                                   value={details.staffstrength || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Status */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaChartLine className="text-main_color" />
                                   <span>Status</span>
                              </label>
                              <input
                                   type="text"
                                   name="status"
                                   value={details.status || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>

                         {/* Owner Name */}
                         <div className="space-y-1">
                              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                   <FaUserCircle className="text-main_color" />
                                   <span>Owner Name</span>
                              </label>
                              <input
                                   type="text"
                                   name="owner_name"
                                   value={details.owner_name || ''}
                                   onChange={onTextFieldChange}
                                   className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-main_color focus:ring focus:ring-main_color/40"
                              />
                         </div>


                         {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
                              <div className="flex flex-col items-center">
                                   <Label htmlFor="imgs" className="w-full h-[300px] cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2">
                                        <img src={imagePreview.ceoImg} alt="CEO" className={`${imagePreview.ceoImg === '/images/upload.png' ? 'h-5/6 w-5/6' : 'h-full w-full'} rounded-full object-cover`} />
                                        {imagePreview.ceoImg === '/images/upload.png' && (

                                             <span className="text-gray-500">Click to upload CEO photo</span>
                                        )}
                                   </Label>
                                   <input type="file" name='ceoImg' id="imgs" className="hidden" onChange={onFileFieldChange} />
                              </div>

                              <div className="flex flex-col items-center">
                                   <Label htmlFor="productImg" className="w-full h-[300px] cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2">
                                        <img src={imagePreview.logo} alt="Product" className={`${imagePreview.logo === '/images/upload.png' ? 'h-5/6 w-5/6' : 'h-full w-full'} rounded-md object-cover`} />
                                        {imagePreview.logo === '/images/upload.png' && (

                                             <span className="text-gray-500">Click to upload product image</span>
                                        )}
                                   </Label>
                                   <input type="file" name='logo' id="productImg" className="hidden" onChange={onFileFieldChange} />
                              </div>
                         {/* </div> */}
                    </div>
               </Modal.Body>
               <Modal.Footer className="bg-gray-100 border-t border-gray-200 flex justify-end space-x-4">
                    <Button
                         color="light"
                         onClick={closeModal}
                         className="font-semibold text-gray-700 border border-gray-300 hover:bg-gray-200 rounded-md "
                    >
                         <span className="flex items-center space-x-2">
                              <FaTimes />
                              <span>Cancel</span>
                         </span>               </Button>
                    <Button
                         onClick={onSaveChanges}
                         className="font-semibold text-white bg-main_color hover:bg-green-600 rounded-md "
                    >
                         <span className="flex items-center space-x-2">
                              <FaSave />
                              <span>Save Changes</span>
                         </span>
                    </Button>
               </Modal.Footer>
          </Modal>
     )
}

export default EditBusinessModal;