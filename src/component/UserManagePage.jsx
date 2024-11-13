import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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

import { FaArrowsRotate } from "react-icons/fa6";
import { Modal, Button, Spinner, Table } from "flowbite-react";
import { showToast } from "../utils/Toast";
import { Link } from "react-router-dom";
import EditBusinessModal from "./EditBusinessModal";

export function UserManagePage() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [editingBusiness, setEditingBusiness] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showBusiness, setShowBusiness] = useState(false);
    const [viewBusiness, setViewBusiness] = useState({});

    const [editMode, setEditMode] = useState(false);
    const [businessDetails, setBusinessDetails] = useState({});
    const [imgEdit, setImgEdit] = useState({
        logo: '',
        ceoImg: ''
    })
    const [imgEditPreview, setImgEditPreview] = useState({
        logo: '',
        ceoImg: ''
    })

    const fetchBusinesses = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/user-businesses/`, {
                params: {
                    q: 'verified'
                },
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                },
            });
            console.log(response.data);
            setBusinesses(response.data);
        } catch (error) {
            setError('Error fetching businesses.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const handleViewBusiness = (data) => {
        setShowBusiness(true)
        setViewBusiness(data)
    }

    const closeViewBusiness = () => {
        setShowBusiness(false)
        setViewBusiness({})
    }

    const handleEdit = (business) => {
        setEditMode(true);
        setBusinessDetails(business);
        setImgEditPreview({
            logo: `${import.meta.env.REACT_APP_API_URL}${business.logo}`,
            ceoImg: `${import.meta.env.REACT_APP_API_URL}${business.ceoImg}`
        })
    };

    const handleUpdateBusiness = async () => {
        showToast('warning', 'This feature is not available at the moment');
        // try {
        //     const response = await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/update-business/`, businessDetails, {
        //         headers: {
        //             Authorization: `Token ${Cookies.get('token')}`,
        //         },
        //     });
        //     setBusinesses(prev => prev.map(b => (b.id === businessDetails.id ? businessDetails : b)));
        //     showToast('success', response?.data?.message || 'Business updated successfully');
        // } catch (error) {
        //     showToast('error', 'Failed to update business');
        // } finally {
        //     setEditMode(false);
        // }
    };

    const handleDeleteClick = (email) => setConfirmDelete(email);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/delete-business/`, { email: confirmDelete }, {
                headers: { Authorization: `Token ${Cookies.get('token')}` },
            });
            setBusinesses(prev => prev.filter(b => b.email !== confirmDelete));
            showToast('success', response?.data?.message || 'Business deleted successfully');
        } catch (err) {
            showToast('error', err?.message || 'Error deleting business');
        } finally {
            setConfirmDelete(null);
            setIsDeleting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleEditFileChange = (e) => {
        const { name, files } = e.target;
        setImgEditPreview(prev => ({ ...prev, [name]: URL.createObjectURL(files[0]) }))
        setImgEdit(prev => ({ ...prev, [name]: files[0] }));
    };

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
                <h1 className="text-lg lg:text-2xl font-bold text-gray-700 ">
                    Manage All your Businesses
                </h1>
                <div className="flex items-center gap-5">
                    <Button as={Link} to='/member/add-business' className="!bg-main_color text-white !font-semibold">
                        <FaPlusSquare className="mr-2 h-5 w-5" />
                        Add Business
                    </Button>
                    <button onClick={fetchBusinesses} className="cursor-pointer text-main_color rounded-full p-3 bg-gray-200 hover:bg-gray-300">
                        <FaArrowsRotate className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table hoverable className="w-full">
                    <Table.Head className="">
                        <Table.HeadCell className="bg-main_color text-white text-center">N/O</Table.HeadCell>
                        <Table.HeadCell className="bg-main_color text-white text-center">Company Name</Table.HeadCell>
                        <Table.HeadCell className="bg-main_color text-white text-center">Email</Table.HeadCell>
                        <Table.HeadCell className="bg-main_color text-white text-center">Phone</Table.HeadCell>
                        <Table.HeadCell className="bg-main_color text-white text-center">Status</Table.HeadCell>
                        <Table.HeadCell className="bg-main_color text-white text-center">Date Created</Table.HeadCell>
                        <Table.HeadCell className="bg-main_color text-white text-center">Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y bg-white">
                        {loading ? (
                            <Table.Row>
                                <Table.Cell colSpan="7" className="bg-white text-center py-4">
                                    <FaSpinner className="animate-spin text-2xl text-gray-600 inline-block mr-2" />
                                    Loading businesses...
                                </Table.Cell>
                            </Table.Row>
                        ) : error ? (
                            <Table.Row>
                                <Table.Cell colSpan="7" className="bg-white text-center py-4 text-red-500">
                                    <FaExclamationTriangle className="text-2xl inline-block mr-2" />
                                    {error}
                                </Table.Cell>
                            </Table.Row>
                        ) : businesses.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan="7" className="bg-white text-center py-4 text-gray-600">
                                    <FaBoxOpen className="text-2xl inline-block mr-2" />
                                    No businesses found.
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            businesses.map((business, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="text-center">{index + 1}</Table.Cell>
                                    <Table.Cell className="text-center font-medium text-gray-900">
                                        {business.companyname}
                                    </Table.Cell>
                                    <Table.Cell className="text-center">{business.email}</Table.Cell>
                                    <Table.Cell className="text-center">{business.phonenumber}</Table.Cell>
                                    <Table.Cell className="text-center">{business.status}</Table.Cell>
                                    <Table.Cell className="text-center">{business.created_at}</Table.Cell>
                                    <Table.Cell className="text-center">
                                        <div className="flex items-center justify-center space-x-4">
                                            {/* <FaEye onClick={() => handleViewBusiness(business)} className="cursor-pointer text-gray-700 hover:text-gray-900" /> */}
                                            <FaEye onClick={() => handleEdit(business)} className="cursor-pointer text-yellow-300" />
                                            {/* <FaEdit onClick={() => handleEdit(business)} className="cursor-pointer text-green-600 hover:text-green-800" /> */}
                                            <FaTrash onClick={() => handleDeleteClick(business.email)} className="cursor-pointer text-red-600 hover:text-red-800" />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </div>

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <Modal position="center" show={true} onClose={() => setConfirmDelete(null)}>
                    <Modal.Header>Confirm Deletion</Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this business?</p>
                    </Modal.Body>
                    <Modal.Footer className="justify-end">
                        <Button color="light" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                        <Button color="failure" className="flex items-center justify-center" onClick={handleConfirmDelete} disabled={isDeleting}>
                            {isDeleting ? <Spinner size="sm" className="mr-2" /> : 'Yes, delete'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}


            {/* {viewBusiness && ( */}
            <Modal position="center" show={showBusiness} onClose={() => closeViewBusiness()} size="4xl">
                <Modal.Header className="bg-main_color text-white text-lg font-bold flex items-center space-x-2 rounded-t-lg shadow-md">
                    <FaBuilding className="text-white" />
                    <span>Business Details</span>
                </Modal.Header>
                <Modal.Body className="bg-white p-6 rounded-b-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Company Name */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaBuilding className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Company Name</p>
                                <p className="text-gray-800">{viewBusiness.companyname || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaMapMarkerAlt className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Address</p>
                                <p className="text-gray-800">{viewBusiness.address || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Local Government */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaFlag className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Local Government</p>
                                <p className="text-gray-800">{viewBusiness.localgovernment || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Town */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaCity className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Town</p>
                                <p className="text-gray-800">{viewBusiness.town || 'N/A'}</p>
                            </div>
                        </div>

                        {/* State */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaFlag className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">State</p>
                                <p className="text-gray-800">{viewBusiness.state || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaEnvelope className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Email</p>
                                <p className="text-gray-800">{viewBusiness.email || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaPhone className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Phone Number</p>
                                <p className="text-gray-800">{viewBusiness.phonenumber || 'N/A'}</p>
                            </div>
                        </div>

                        {/* WhatsApp Number */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaPhone className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">WhatsApp Number</p>
                                <p className="text-gray-800">{viewBusiness.whatsappnumber || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaGlobe className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Website</p>
                                <p className="text-gray-800">{viewBusiness.website || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Staff Strength */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaUsers className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Staff Strength</p>
                                <p className="text-gray-800">{viewBusiness.staffstrength || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaChartLine className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Status</p>
                                <p className="text-gray-800">{viewBusiness.status || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Owner Name */}
                        <div className="flex items-center p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
                            <FaUserCircle className="text-main_color mr-3 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Owner Name</p>
                                <p className="text-gray-800">{viewBusiness.owner_name || 'N/A'}</p>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-gray-100 border-t border-gray-200 flex justify-end rounded-b-lg shadow-md">
                    <Button
                        color="light"
                        onClick={closeViewBusiness}
                        className="px-4 py-2 font-semibold text-main_color border border-gray-300 hover:bg-gray-200 rounded-md flex items-center justify-center space-x-2"
                    >
                        <FaTimes />
                        <span>Close</span>
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* )} */}



            {/* Edit Business Modal */}
            {/* {editMode && ( */}

            <EditBusinessModal
                isOpen={editMode}
                closeModal={() => {
                    setBusinessDetails({});
                    setEditMode(false);
                }}
                details={businessDetails}
                imagePreview={{ ...imgEditPreview }}
                onFileFieldChange={handleEditFileChange}
                onTextFieldChange={handleInputChange}
                onSaveChanges={handleUpdateBusiness}
            />
            
           

            {/* )} */}
        </div>
    );
}

export default UserManagePage;
