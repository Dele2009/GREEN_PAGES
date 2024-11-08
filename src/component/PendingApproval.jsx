import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../assets/pending.css';
import Cookies from 'js-cookie'

const PendingApproval = () => {
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/businesses-in-admin`, {
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
          },
        });
        const pendingBusinesses = response.data.filter(business => business.status.toLowerCase() === "pending");
        setPendingBusinesses(pendingBusinesses);
      } catch (error) {
        setError("Failed to load pending businesses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproval = async (index, email, e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/approve-business/`, { email }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      if (response.status === 200) {
        const updatedBusinesses = pendingBusinesses.map((business, i) =>
          i === index ? { ...business, status: "approved" } : business
        );
        setPendingBusinesses(updatedBusinesses);
        setMessage("Business approved successfully!");
        setIsSuccess(true);
      } else {
        setMessage("Business not found. Status not updated.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred while approving the business.");
      setIsSuccess(false);
    } finally {
      setMessageModalVisible(true);
    }
  };

  const handleReject = async (index, e) => {
    e.stopPropagation();
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const handleRejectionSubmit = async () => {
    const business = pendingBusinesses[deleteIndex];
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/reject-business/`, {
        email: business.email,
        reason: rejectionReason,
      }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedBusinesses = pendingBusinesses.filter((_, i) => i !== deleteIndex);
        setPendingBusinesses(updatedBusinesses);
        setMessage("Business rejected successfully!");
        setIsSuccess(true);
      } else {
        setMessage("Business not found. Status not updated.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error rejecting business:", error);
      setMessage("An error occurred while rejecting the business.");
      setIsSuccess(false);
    } finally {
      setIsModalOpen(false);
      setRejectionReason('');
      setMessageModalVisible(true);
    }
  };

  const openModal = (business) => {
    setSelectedBusiness(business);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBusiness(null);
  };

  const closeMessageModal = () => {
    setMessageModalVisible(false);
    setMessage('');
  };

  return (
    <div className="pending-approval-container">
      <AdminHeader />
      <AdminSidebar />
      <div className="pending-approval">
        <div className='pending-header'>
          <h1>Pending Approval</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          pendingBusinesses.length === 0 ? (
            <p>No pending businesses available.</p>
          ) : (
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
                {pendingBusinesses.map((business, index) => (
                  <tr key={index} onClick={() => openModal(business)}>
                    <td>{business.companyname}</td>
                    <td>{business.email}</td>
                    <td>{business.phonenumber}</td>
                    <td>{business.status}</td>
                    <td>{business.created_at}</td>
                    <td>
                      <FaCheck
                        className="action-icon approve-icon"
                        title="Approve"
                        onClick={(e) => handleApproval(index, business.email, e)}
                      />
                      <FaTimes
                        className="action-icon reject-icon"
                        onClick={(e) => handleReject(index, e)}
                        title="Reject"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {modalVisible && selectedBusiness && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{selectedBusiness.companyname}</h2>
              <p><strong>Email:</strong> {selectedBusiness.email}</p>
              <p><strong>Phone Number:</strong> {selectedBusiness.phonenumber}</p>
              <p><strong>Status:</strong> {selectedBusiness.status}</p>
              <p><strong>State:</strong> {selectedBusiness.state}</p>
              <p><strong>Local Government:</strong> {selectedBusiness.localgovernment}</p>
              <p><strong>Town/City:</strong> {selectedBusiness.town}</p>
              <p><strong>WhatsApp Number:</strong> {selectedBusiness.whatsappnumber}</p>
              <p><strong>Category of Business:</strong> {selectedBusiness.categoryofbusiness}</p>
              <p><strong>Website:</strong> {selectedBusiness.website}</p>
              <p><strong>Staff Strength:</strong> {selectedBusiness.staffstrength}</p>
              <p><strong>Address:</strong> {selectedBusiness.address}</p>
              <button onClick={closeModal} className="close-button">Close</button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Reject Business</h2>
              <p>Enter the reason for rejection:</p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for rejection"
                rows="4"
                style={{ width: '100%' }}
              />
              <div className="modal-actions">
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button onClick={handleRejectionSubmit}>Reject</button>
              </div>
            </div>
          </div>
        )}

        {messageModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{isSuccess ? "Success" : "Error"}</h2>
              <p>{message}</p>
              <button onClick={closeMessageModal} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApproval;

