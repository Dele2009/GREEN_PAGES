import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { Modal, Button, Spinner } from 'flowbite-react';
import { showToast } from '../utils/Toast';

const UserManagePage = () => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [businesses, setBusinesses] = useState([]);
    const [editingBusiness, setEditingBusiness] = useState(null);
    const [image, setImage] = useState();
    const [productImage, setProductImage] = useState();
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewBusiness, setViewBusiness] = useState(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/user-businesses/`, {
                    headers: {
                        Authorization: `Token ${Cookies.get('token')}`,
                    },
                });
                setBusinesses(response.data);
            } catch (error) {
                setError('Error fetching businesses.');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const handleEdit = (business) => {
        setEditingBusiness(business);
        setImage(business.ceoImg);
        setProductImage(business.logo);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingBusiness(prev => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleProductImage = (e) => {
        setProductImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form submission logic here.
        setEditingBusiness(null);
        setImage(null);
        setProductImage(null);
    };

    const handleDeleteClick = (email) => {
        setConfirmDelete(email);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true)
        try {
            // Delete API call
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/delete-business/`, {
                email: confirmDelete,
            }, {
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                }
            })
            setBusinesses(prevBusinesses => prevBusinesses.filter(business => business.email !== confirmDelete));
            showToast('success', response?.data?.message || 'Business deleted successfully')

        } catch (err) {
            showToast('error', err?.message || 'Error deleting business. Please try again.');
        } finally {
            setConfirmDelete(null);
            setIsDeleting(false)
        }
    };

    const handleViewBusiness = (business) => {
        setViewBusiness(business);
    };

    return (
        <div className="px-4 py-8 lg:px-16 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">User Management Page</h1>
            {loading ? (
                <p>Loading businesses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : editingBusiness ? (
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Edit Business</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Company Name</label>
                            <input type="text" name="companyname" value={editingBusiness.companyname} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input type="text" name="email" value={editingBusiness.email} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" readOnly />
                        </div>
                        {/* Other fields */}
                        <div className="flex items-center space-x-4">
                            <Button type="submit" color="success">Save Changes</Button>
                            <Button color="light" onClick={() => setEditingBusiness(null)}>Cancel</Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Your Businesses</h2>
                    {businesses.length > 0 ? (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-green-700 text-white">
                                        <th className="px-4 py-2">Company Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Phone</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Date Created</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businesses.map(business => (
                                        <tr key={business.email} className="border-t">
                                            <td className="px-4 py-2">{business.companyname}</td>
                                            <td className="px-4 py-2">{business.email}</td>
                                            <td className="px-4 py-2">{business.phonenumber}</td>
                                            <td className="px-4 py-2">{business.status}</td>
                                            <td className="px-4 py-2">{business.created_at}</td>
                                            <td className="px-4 py-2 flex space-x-4">
                                                <FaEye onClick={() => handleViewBusiness(business)} className="cursor-pointer text-gray-700 hover:text-gray-900" />
                                                <FaEdit onClick={() => handleEdit(business)} className="cursor-pointer text-green-600 hover:text-green-800" />
                                                <FaTrash onClick={() => handleDeleteClick(business.email)} className="cursor-pointer text-red-600 hover:text-red-800" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No businesses found.</p>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <Modal show={true} onClose={() => setConfirmDelete(null)}>
                    <Modal.Header>Confirm Deletion</Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this business?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="light" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                        <Button className='flex items-center justify-center' color="failure" onClick={handleConfirmDelete}>
                            {isDeleting ? <Spinner size="sm" className="mr-2" /> : 'Yes, delete'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* View Business Modal */}
            {viewBusiness && (
                <Modal show={true} onClose={() => setViewBusiness(null)}>
                    <Modal.Header>Business Details</Modal.Header>
                    <Modal.Body>
                        <p><strong>Status: </strong>{viewBusiness.status}</p>
                        <p><strong>Company Name:</strong> {viewBusiness.companyname}</p>
                        <p><strong>Email:</strong> {viewBusiness.email}</p>
                        {/* Additional details */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="light" onClick={() => setViewBusiness(null)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default UserManagePage;
