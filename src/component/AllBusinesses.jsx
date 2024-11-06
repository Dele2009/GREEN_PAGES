import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';
import { FaEdit, FaTrash, FaPause, FaPlay, FaEye } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const AllBusinesses = () => {
  const [apiBusinesses, setApiBusinesses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBusiness, setEditedBusiness] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [suspendIndex, setSuspendIndex] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [viewBusiness, setViewBusiness] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/businesses-in-admin`, {
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
          },
        });
        const verifiedBusinesses = response.data.filter(business => business.status.toLowerCase() === "verified");
        setApiBusinesses(verifiedBusinesses);
      } catch (error) {
        setErrorMessage("Error fetching businesses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeApiBusiness = async () => {
    const businessEmail = apiBusinesses[deleteIndex].email;
    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin-delete-business/`, { email: businessEmail }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setApiBusinesses(prev => prev.filter((_, i) => i !== deleteIndex));
    } catch (error) {
      setErrorMessage("Error deleting business. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setEditedBusiness((prev) => ({
      ...prev,
      ceoImg: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleProductImage = (e) => {
    setEditedBusiness((prev) => ({
      ...prev,
      productImg: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    const business = apiBusinesses[index];
    setEditedBusiness({
      companyname: business.companyname,
      id: business.id,
      phonenumber: business.phonenumber,
      email: business.email,
      status: business.status,
      createdAt: business.created_at,
      state: business.state,
      localgovernment: business.localgovernment,
      address: business.address,
      whatsappnumber: business.whatsappnumber,
      website: business.website,
      categoryofbusiness: business.categoryofbusiness,
      ceoImg: business.ceoImg,
      productImg: business.productImg,
      town: business.town,
      staffstrength: business.staffstrength,
      isAuthorized: business.isAuthorized,
    });
    setIsEditModalOpen(true);
  };

  const saveApiEdit = async () => {
    const businessId = apiBusinesses[editIndex].id;
    const formData = new FormData();

    Object.keys(editedBusiness).forEach(key => {
      formData.append(key, editedBusiness[key]);
    });

    if (document.getElementById('imgs').files[0]) {
      formData.append('ceoImg', document.getElementById('imgs').files[0]);
    }
    if (document.getElementById('productImg').files[0]) {
      formData.append('productImg', document.getElementById('productImg').files[0]);
    }

    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin-edit-business/${businessId}/`, formData, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setApiBusinesses(prevBusinesses =>
        prevBusinesses.map((business, i) => (i === editIndex ? { ...business, ...editedBusiness } : business))
      );
    } catch (error) {
      setErrorMessage("Error updating business. Please try again.");
    } finally {
      setEditIndex(null);
      setEditedBusiness({});
      setIsEditModalOpen(false);
    }
  };

  const handleSuspend = async (index) => {
    const businessEmail = apiBusinesses[index].email;

    try {
      await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/suspend-business/`,
        { email: businessEmail, reason: suspendReason },
        {
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
          },
        }
      );

      setApiBusinesses(prev =>
        prev.map((business, i) => (i === index ? { ...business, status: "suspended" } : business))
      );

      setIsSuspendModalOpen(false);
      setSuspendReason('');
    } catch (error) {
      setErrorMessage("Error suspending business. Please try again.");
    }
  };

  const handleStatusChange = async (index) => {
    const businessEmail = apiBusinesses[index].email;
    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/unsuspend-business/`, { email: businessEmail }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setApiBusinesses(prevBusinesses =>
        prevBusinesses.map((business, i) => (i === index ? { ...business, status: "verified" } : business))
      );
    } catch (error) {
      setErrorMessage("Error reactivating business. Please try again.");
    }
  };

  const handleViewBusiness = (business) => {
    setViewBusiness(business);
  };

  const handleCloseModal = () => {
    setViewBusiness(null);
  };

  const handleCloseErrorModal = () => {
    setErrorMessage('');
  };

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="all-businesses">
        <div className='all-header'>
          <h1>Verified Business List</h1>
          <Link to="/add" className="add-business-button">Add Business</Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          apiBusinesses.length === 0 ? (
            <p>No verified businesses available.</p>
          ) : (
            <table>
              <thead>
                <tr style={{ color: '#fff' }}>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiBusinesses.map((business, index) => (
                  <tr key={index}>
                    <td>{business.companyname}</td>
                    <td>{business.email}</td>
                    <td>{business.phonenumber}</td>
                    <td>{business.status}</td>
                    <td>{business.created_at}</td>
                    <td>
                      <FaEye title='view' className="action-icon edit-icon" onClick={() => handleViewBusiness(business)} />
                      <FaEdit title='edit' className="action-icon edit-icon" onClick={() => startEditing(index)} />
                      <FaTrash title='delete' className="action-icon delete-icon" onClick={() => { setDeleteIndex(index); setIsDeleteModalOpen(true); }} />
                      {business.status === "verified" ? (
                        <FaPause title="Suspend" className="action-icon edit-icon" onClick={() => { setSuspendIndex(index); setIsSuspendModalOpen(true); }} />
                      ) : (
                        <FaPlay title="Reactivate" className="action-icon edit-icon" onClick={() => handleStatusChange(index)} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {isEditModalOpen && (
          <div className="modal-overlay-edit">
            <div className="modal-content-edit">
              <h2>Edit Business</h2>
              <form onSubmit={(e) => { e.preventDefault(); saveApiEdit(); }}>
                <label>
                  Company Name:
                  <input
                    type="text"
                    name="companyname"
                    value={editedBusiness.companyname}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editedBusiness.email}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="tel"
                    name="phonenumber"
                    value={editedBusiness.phonenumber}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={editedBusiness.address}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Town:
                  <input
                    type="text"
                    name="town"
                    value={editedBusiness.town}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  State:
                  <input
                    type="text"
                    name="state"
                    value={editedBusiness.state}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Local Government:
                  <input
                    type="text"
                    name="localgovernment"
                    value={editedBusiness.localgovernment}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  WhatsApp Number:
                  <input
                    type="tel"
                    name="whatsappnumber"
                    value={editedBusiness.whatsappnumber}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Website:
                  <input
                    type="url"
                    name="website"
                    value={editedBusiness.website}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  Category of Business:
                  <input
                    type="text"
                    name="categoryofbusiness"
                    value={editedBusiness.categoryofbusiness}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  CEO Image:
                  <input type="file" id="imgs" onChange={handleImage} />
                  {editedBusiness.ceoImg && <img src={editedBusiness.ceoImg} alt="CEO" className="uploaded-image" />}
                </label>
                <label>
                  Product Image:
                  <input type="file" id="productImg" onChange={handleProductImage} />
                  {editedBusiness.productImg && <img src={editedBusiness.productImg} alt="Product" className="uploaded-image" />}
                </label>
                <label>
                  Staff Strength:
                  <input
                    type="number"
                    name="staffstrength"
                    value={editedBusiness.staffstrength}
                    onChange={handleEditChange}
                  />
                </label>
                <div className='mode-btn'>
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this business?</p>
              <div className='modal-actions'>
                <button onClick={removeApiBusiness}>Yes, Delete</button>
                <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {isSuspendModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Reason for Suspension</h2>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Enter the reason for suspension"
              />
              <div className="modal-actions">
                <button onClick={() => setIsSuspendModalOpen(false)}>Cancel</button>
                <button onClick={() => handleSuspend(suspendIndex)}>Suspend</button>
              </div>
            </div>
          </div>
        )}

        {viewBusiness && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Business Details</h3>
              <p><strong>Company Name:</strong> {viewBusiness.companyname}</p>
              <p><strong>Email:</strong> {viewBusiness.email}</p>
              <p><strong>Status:</strong> {viewBusiness.status}</p>
              <p><strong>Date Created:</strong> {viewBusiness.created_at}</p>
              <p><strong>Phone Number:</strong> {viewBusiness.phonenumber}</p>
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

        {errorMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Error</h2>
              <p>{errorMessage}</p>
              <div className="modal-actions">
                <button onClick={handleCloseErrorModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBusinesses;

