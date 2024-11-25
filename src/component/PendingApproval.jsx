import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaCheck, FaCheckCircle, FaExclamationTriangle, FaEye, FaPlusSquare, FaSpinner, FaTimes, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Modal, Table, Textarea } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaArrowsRotate } from 'react-icons/fa6';
import { showToast } from '../utils/Toast';
import { AiOutlineLoading } from 'react-icons/ai';
import ViewBusinessDetails from './ViewBusinessDetails';
import { formatDate } from '../utils/helpers';

const PendingApproval = () => {
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApproval, setLoadingApproval] = useState(false);

  const [error, setError] = useState('');


  const [isViewing, setIsViewing] = useState(false)
  const [viewBusiness, setViewBusiness] = useState({});

  const [approvalModal, setApprovalModal] = useState(false)
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [approvalIndex, setApprovalIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/businesses-in-admin`, {
        params: {
          q: 'pending'
        },
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
  useEffect(() => {

    fetchData();
  }, []);

  const handleApproval = (index) => {
    setApprovalIndex(index)
    setApprovalModal(true)
  }

  const handleApprovalSubmit = async (e) => {
    e.stopPropagation();
    setLoadingApproval(true)
    const businessToApprove = pendingBusinesses[approvalIndex]
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin-business-action/`, { email: businessToApprove.email }, {
        params: {
          q: 'verified'
        },
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      console.log(response)
      if (response.status === 200) {
        setPendingBusinesses(prev => prev.filter((_, i) => i !== approvalIndex));
        showToast("success", "Business approved successfully!");
        // setIsSuccess(true);
      } else {
        showToast("error", "Business not found. Status not updated.");
        // setIsSuccess(false);
      }
    } catch (error) {
      showToast("error", "An error occurred while approving the business.");
      // setIsSuccess(false);
    } finally {
      setApprovalModal(false);
      setLoadingApproval(false)
    }
  };

  const handleReject = (index, e) => {
    e.stopPropagation();
    setDeleteIndex(index);
    setIsRejectionModalOpen(true);
  };

  const handleRejectionSubmit = async () => {
    const business = pendingBusinesses[deleteIndex];
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin-business-action/`, {
        email: business.email,
        reason: rejectionReason,
      }, {
        params: {
          q: 'rejected'
        },
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      console.log(response)

      if (response.status === 200) {
        setPendingBusinesses(prev => prev.filter((_, i) => i !== deleteIndex));
        showToast("success", "Business rejected successfully!");
        // setIsSuccess(true);
      } else {
        showToast("error", "Business not found. Status not updated.");
        // setIsSuccess(false);
      }
    } catch (error) {
      showToast("error", "An error occurred while rejecting the business.");
      // setIsSuccess(false);
    } finally {
      setIsRejectionModalOpen(false);
      setRejectionReason('');
      // setMessageModalVisible(true);
    }
  };

  const handleView = (business) => {
    setIsViewing(true)
    setViewBusiness(business)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-lg lg:text-2xl font-bold">Pending Approvals</h1>
        <div className="flex items-center gap-5">
          <Button
            as={Link}
            to="/admin/all-businesses"
            className="!bg-main_color text-white !font-semibold"
          >
            <FaPlusSquare className="mr-2 h-5 w-5" />
            Manage Businesses
          </Button>
          <button
            onClick={fetchData}
            className="cursor-pointer text-main_color rounded-full p-3 bg-gray-200 hover:bg-gray-300"
          >
            <FaArrowsRotate className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head className="">
            <Table.HeadCell className="bg-main_color text-white text-center">
              N/O
            </Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">
              Company Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">
              Email
            </Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">
              Phone Number
            </Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">
              Date Created
            </Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">
              Actions
            </Table.HeadCell>
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
                <Table.Cell
                  colSpan="7"
                  className="bg-white text-center py-4 text-red-500"
                >
                  <FaExclamationTriangle className="text-2xl inline-block mr-2" />
                  {error}
                </Table.Cell>
              </Table.Row>
            ) : pendingBusinesses.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan="7"
                  className="bg-white text-center py-4 text-gray-600"
                >
                  <FaBoxOpen className="text-2xl inline-block mr-2" />
                  No Pending businesses found.
                </Table.Cell>
              </Table.Row>
            ) : (
              pendingBusinesses.map((business, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="text-center">{index + 1}</Table.Cell>
                  <Table.Cell className="text-center">
                    {business.companyname}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {business.email}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {business.phonenumber}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {business.status}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {formatDate(business.created_at)}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <FaEye
                        className="cursor-pointer text-yellow-300 text-lg"
                        title="View Details"
                        onClick={() => handleView(business)}
                      />
                      <FaCheckCircle
                        className="cursor-pointer text-green-500 text-lg"
                        title="Approve"
                        onClick={() => handleApproval(index)}
                      />
                      <FaTimesCircle
                        className="cursor-pointer text-red-500 text-lg"
                        title="Reject"
                        onClick={(e) => handleReject(index, e)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* View details modal */}
      <ViewBusinessDetails
        isOpen={isViewing}
        details={viewBusiness}
        onClose={() => {
          setIsViewing(false);
          setViewBusiness({});
        }}
      />

      {/* Rejection Modal */}
      <Modal
        position="center"
        show={isRejectionModalOpen}
        onClose={() => setIsRejectionModalOpen(false)}
      >
        <Modal.Header className="flex items-center gap-2 text-red-500">
          <FaExclamationTriangle className="text-xl inline-block" />{" "}
          <span>Reject Business</span>
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700 mb-2">
            Please provide a reason for rejecting this business:
          </p>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection..."
            rows="4"
            // className="w-full p-3 border rounded-lg focus:outline-none focus:border-red-500"
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-3">
          <Button
            onClick={() => setIsRejectionModalOpen(false)}
            outline
            color='gray'
          >
            Cancel
          </Button>
          <Button
            onClick={handleRejectionSubmit}
            className="bg-[#ff0000] text-white rounded-md hover:bg-[#ff0000] transition"
          >
            Reject
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Approval Confirmation Modal */}
      <Modal
        position="center"
        show={approvalModal}
        onClose={() => setApprovalModal(false)}
      >
        <Modal.Header className="">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-main_color text-xl" />
            <span>Confirm Approval</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            Are you sure you want to approve this business?
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-3">
          <button
            onClick={() => setApprovalModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            disabled={loadingApproval}
            onClick={(e) => handleApprovalSubmit(e)}
            className="px-4 py-2 bg-main_color text-white rounded-md transition"
          >
            {loadingApproval ? (
              <AiOutlineLoading className="size-7 animate-spin" />
            ) : (
              " Confirm"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PendingApproval;
