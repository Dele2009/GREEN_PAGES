import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import UserHeader from '../component/UserHeader'
import UserSidebar from '../component/UserSidebar'
import '../assets/userManage.css'
import Cookies from 'js-cookie'

const UserManagePage = () => {
    const [businesses, setBusinesses] = useState([])
    const [editingBusiness, setEditingBusiness] = useState(null)
    const [image, setImage] = useState()
    const [productImage, setProductImage] = useState()
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [viewBusiness, setViewBusiness] = useState(null)

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true)
            setError('')
            try {
                const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/user-businesses/`, {
                    headers: {
                        Authorization: `Token ${Cookies.get('token')}`,
                    },
                })
                setBusinesses(response.data)
            } catch (error) {
                setError('Error fetching businesses.')
            } finally {
                setLoading(false)
            }
        }

        fetchBusinesses()
    }, [])

    const handleEdit = (business) => {
        setEditingBusiness(business)
        setImage(business.ceoImg)
        setProductImage(business.logo)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditingBusiness(prev => ({ ...prev, [name]: value }))
    }

    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleProductImage = (e) => {
        setProductImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (e) => {
        const businessId = editingBusiness.id
        e.preventDefault()
        const formData = new FormData()

        Object.keys(editingBusiness).forEach(key => {
            formData.append(key, editingBusiness[key])
        })

        if (document.getElementById('imgs').files[0]) {
            formData.append('ceoImg', document.getElementById('imgs').files[0])
        }
        if (document.getElementById('productImg').files[0]) {
            formData.append('logo', document.getElementById('productImg').files[0])
        }

        try {
            await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/edit-business/${businessId}/`, { ...editingBusiness }, {
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            setBusinesses(prevBusinesses =>
                prevBusinesses.map(business =>
                    business.id === editingBusiness.id ? { ...editingBusiness } : business
                )
            )
            setEditingBusiness(null)
            setImage(null)
            setProductImage(null)
        } catch (error) {
            setError('Error updating business. Please try again.')
        }
    }

    const handleDeleteClick = (email) => {
        setConfirmDelete(email)
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/delete-business/`, { email: confirmDelete }, {
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                },
            })

            setBusinesses(prevBusinesses => prevBusinesses.filter(business => business.email !== confirmDelete))
            setConfirmDelete(null)
        } catch (error) {
            setError('Error deleting business. Please try again.')
        }
    }

    const handleCancelDelete = () => {
        setConfirmDelete(null)
    }

    const handleViewBusiness = (business) => {
        setViewBusiness(business)
    }

    const handleCloseModal = () => {
        setViewBusiness(null)
    }

    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className="user-content">
                <h1>User Management Page</h1>

                {loading ? (
                    <p>Loading businesses...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : editingBusiness ? (
                    <div className="edit-form-container">
                        <h2>Edit Business</h2>
                        <form onSubmit={handleSubmit} className="edit-form">
                            <label>
                                Company Name:
                                <input
                                    type="text"
                                    name="companyname"
                                    value={editingBusiness.companyname}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    value={editingBusiness.email}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </label>
                            <label>
                                Phone Number:
                                <input
                                    type="text"
                                    name="phonenumber"
                                    value={editingBusiness.phonenumber}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                WhatsApp Number:
                                <input
                                    type="text"
                                    name="whatsappnumber"
                                    value={editingBusiness.whatsappnumber}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                State:
                                <input
                                    type="text"
                                    name="state"
                                    value={editingBusiness.state}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Local Government:
                                <input
                                    type="text"
                                    name="localgovernment"
                                    value={editingBusiness.localgovernment}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Town/City:
                                <input
                                    type="text"
                                    name="town"
                                    value={editingBusiness.town}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Category of Business:
                                <input
                                    type="text"
                                    name="categoryofbusiness"
                                    value={editingBusiness.categoryofbusiness}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Website:
                                <input
                                    type="text"
                                    name="website"
                                    value={editingBusiness.website}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Staff Strength:
                                <input
                                    type="text"
                                    name="staffstrength"
                                    value={editingBusiness.staffstrength}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Address:
                                <textarea
                                    name="address"
                                    value={editingBusiness.address}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                CEO Image:
                                <input
                                    type="file"
                                    id="imgs"
                                    onChange={handleImage}
                                />
                                {image && <img src={image} alt="CEO" />}
                            </label>
                            <label>
                                Product Image:
                                <input
                                    type="file"
                                    id="productImg"
                                    onChange={handleProductImage}
                                />
                                {productImage && <img src={productImage} alt="Product" />}
                            </label>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditingBusiness(null)}>Cancel</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2>Your Businesses</h2>
                        {businesses.length > 0 ? (
                            <table className="business-table">
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Status</th>
                                        <th>Date Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businesses.map(business => (
                                        <tr key={business.email}>
                                            <td>{business.companyname}</td>
                                            <td>{business.email}</td>
                                            <td>{business.phonenumber}</td>
                                            <td>{business.status}</td>
                                            <td>{business.created_at}</td>
                                            <td>
                                                <FaEye onClick={() => handleViewBusiness(business)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                                <FaEdit onClick={() => handleEdit(business)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                                <FaTrash onClick={() => handleDeleteClick(business.email)} style={{ cursor: 'pointer', color: 'red' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No businesses found.</p>
                        )}
                    </div>
                )}

                {confirmDelete && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Confirm Deletion</h3>
                            <p>Are you sure you want to delete this business?</p>
                            <button onClick={handleConfirmDelete} style={{ marginRight: '20px' }}>Yes, delete</button>
                            <button onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    </div>
                )}

                {viewBusiness && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Business Details</h3>
                            <p><strong>Status: </strong>{viewBusiness.status}</p>
                            <p><strong>Company Name:</strong> {viewBusiness.companyname}</p>
                            <p><strong>Email:</strong> {viewBusiness.email}</p>
                            <p><strong>Phone Number:</strong> {viewBusiness.phonenumber}</p>
                            <p><strong>WhatsApp Number:</strong> {viewBusiness.whatsappnumber}</p>
                            <p><strong>State:</strong> {viewBusiness.state}</p>
                            <p><strong>Local Government:</strong> {viewBusiness.localgovernment}</p>
                            <p><strong>Town/City:</strong> {viewBusiness.town}</p>
                            <p><strong>Category of Business:</strong> {viewBusiness.categoryofbusiness}</p>
                            <p><strong>Website:</strong> {viewBusiness.website}</p>
                            <p><strong>CEO Image:</strong>{viewBusiness.ceoImg}</p>
                            <p><strong>Product Image:</strong>{viewBusiness.productImage}</p>
                            <p><strong>Staff Strength:</strong> {viewBusiness.staffstrength}</p>
                            <p><strong>Address:</strong> {viewBusiness.address}</p>
                            <button onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserManagePage
