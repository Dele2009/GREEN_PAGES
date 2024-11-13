import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPause, FaPlay, FaEye, FaPlusSquare, FaSpinner, FaExclamationTriangle, FaBoxOpen } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Modal, Table, Label, Select, Textarea, Badge } from 'flowbite-react';
import { FaArrowsRotate } from 'react-icons/fa6';
import EditBusinessModal from './EditBusinessModal';
import { showToast } from '../utils/Toast';

const AllBusinesses = () => {
  const [apiBusinesses, setApiBusinesses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [editedBusiness, setEditedBusiness] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imgEdit, setImgEdit] = useState({
    logo: '',
    ceoImg: ''
  })
  const [imgEditPreview, setImgEditPreview] = useState({
    logo: '',
    ceoImg: ''
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [suspendIndex, setSuspendIndex] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [viewBusiness, setViewBusiness] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});


  const [sortBy, setSortBy] = useState('all')

  const fetchData = async () => {
    setErrorMessage('')
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/businesses-in-admin`, {
        params: {
          q: sortBy
        },
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      // const verifiedBusinesses = response.data.filter(business => business.status.toLowerCase() === "verified");
      setApiBusinesses(response.data);
    } catch (error) {
      setErrorMessage("Error fetching businesses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortBy]);

  const handleSort = (e) => {
    setSortBy(e.target.value)
    console.log(e.target.value)
    // fetchData()
  }


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

  const startEditing = (business) => {
    // setEditIndex(index);
    // const business = apiBusinesses[index];
    console.log(business)
    setEditedBusiness({ ...business });
    setImgEditPreview({
      logo: `${import.meta.env.REACT_APP_API_URL}${business.logo}`,
      ceoImg: `${import.meta.env.REACT_APP_API_URL}${business.ceoImg}`
    })
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness(prev => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    const { name, files } = e.target;
    setImgEditPreview(prev => ({ ...prev, [name]: URL.createObjectURL(files[0]) }))
    setImgEdit(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleUpdateBusiness = async () => {
    const {ceoImg, logo, ...data} = editedBusiness
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    if (imgEdit.logo) {
      formData.append('logo', imgEdit.logo)
    }
    if (imgEdit.ceoImg) {
      formData.append('ceoImg', imgEdit.ceoImg)
    }

    try {
      let response = await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/admin-edit-business/${editedBusiness.id}/`, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      console.log(response)
      // const newLogo = imgEditPreview.logo || 
      // setEditedBusiness(prev => prev.filter(b => b.id === editedBusiness.id));
      setApiBusinesses(prev => prev.map(b => (b.id === editedBusiness.id ? {...editedBusiness} : b)));
      showToast('success', response?.data?.message || 'Business updated successfully');
    } catch (error) {
      console.log(error)
      showToast('error', 'Failed to update business');
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleSuspend = async (index) => {
    const businessEmail = apiBusinesses[index].email;
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/admin-business-action/`,
        { email: businessEmail, reason: suspendReason },
        {
          params: {
            q: 'suspended'
          },
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
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin-business-action/`, { email: businessEmail }, {
        params: {
          q: 'unsuspended'
        },
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



  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-lg lg:text-2xl font-bold text-gray-700 ">
          Business Management Page
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button as={Link} to='/admin/add-business' className="!bg-main_color text-white !font-semibold">
            <FaPlusSquare className="mr-2 h-5 w-5" />
            Add Business
          </Button>
          <button onClick={fetchData} className="cursor-pointer text-main_color rounded-full p-3 bg-gray-200 hover:bg-gray-300">
            <FaArrowsRotate className="h-5 w-5" />
          </button>
          <div className="max-w-md flex items-center gap-5">
            <div className="block">
              <Label htmlFor="sortby" value="Sort by: " />
            </div>
            <Select value={sortBy} id="sortby" onChange={handleSort}>
              <option>--Choose---</option>
              <option value='all'>All</option>
              <option value='verified'>Verified</option>
              <option value='rejected'>Rejected</option>
              <option value='suspended'>Suspended</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head className="">
            <Table.HeadCell className="bg-main_color text-white text-center">N/O</Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">Company Name</Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">Email</Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">Phone Number</Table.HeadCell>
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
            ) : errorMessage ? (
              <Table.Row>
                <Table.Cell colSpan="7" className="bg-white text-center py-4 text-red-500">
                  <FaExclamationTriangle className="text-2xl inline-block mr-2" />
                  {errorMessage}
                </Table.Cell>
              </Table.Row>
            ) : apiBusinesses.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan="7" className="bg-white text-center py-4 text-gray-600">
                  <FaBoxOpen className="text-2xl inline-block mr-2" />
                  No verified businesses available.
                </Table.Cell>
              </Table.Row>
            ) : (
              apiBusinesses.map((business, index) => (
                <Table.Row key={index} className="border-b">
                  <Table.Cell className="text-center">{index + 1}</Table.Cell>
                  <Table.Cell className="text-center">{business.companyname}</Table.Cell>
                  <Table.Cell className="text-center">{business.email}</Table.Cell>
                  <Table.Cell className="text-center">{business.phonenumber}</Table.Cell>
                  <Table.Cell>
                    <div className="w-fit m-auto relative">
                      <Badge
                        size='sm'
                        color={`${business.status === 'verified' ? 'success' : (business.status === 'suspended') ? 'warning' : 'failure'}`}
                        className="w-fit scale-90"
                      >
                        {business.status}
                      </Badge>
                      <Badge
                        size='xs'
                        // color={`${business.status === 'verified' ? 'success' : (business.status === 'suspended') ? 'warning' : 'failure'}`}
                        className={`size-4 scale-50 animate-pulse rounded-full absolute top-0 -right-1
                          ${business.status === 'verified' ? 'bg-main_color' : (business.status === 'suspended') ? 'bg-yellow-300' : 'bg-[#ff0000]'}
                          `}
                      >
                      </Badge>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-center">{business.created_at}</Table.Cell>
                  <Table.Cell className="text-center">
                    <div className="flex items-center justify-center space-x-4">
                      {/* <FaEye className="cursor-pointer text-gray-700 hover:text-gray-900" onClick={() => handleViewBusiness(business)} /> */}
                      <FaEye className="cursor-pointer text-yellow-300" onClick={() => startEditing(business)} />
                      <FaTrash className="cursor-pointer text-red-600 hover:text-red-800" onClick={() => { setDeleteIndex(index); setIsDeleteModalOpen(true); }} />
                      {business.status === "verified" ? (
                        <FaPause className="cursor-pointer" onClick={() => { setSuspendIndex(index); setIsSuspendModalOpen(true); }} />
                      ) : (
                        <FaPlay className="cursor-pointer" onClick={() => handleStatusChange(index)} />
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Edit Modal */}
      <EditBusinessModal
        isOpen={isEditModalOpen}
        closeModal={() => {
          setEditedBusiness({});
          setIsEditModalOpen(false);
          
        }}
        details={editedBusiness}
        imagePreview={{ ...imgEditPreview }}
        onFileFieldChange={handleEditFileChange}
        onTextFieldChange={handleEditInputChange}
        onSaveChanges={handleUpdateBusiness}
      />
      {/* <Modal position="center" show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Modal.Header>Edit Business</Modal.Header>
        <Modal.Body>
          Form content
        </Modal.Body>
      </Modal> */}

      {/* Delete Modal */}
      <Modal position="center" show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>Are you sure you want to delete this business?</Modal.Body>
        <Modal.Footer>
          <button className="text-red-500" onClick={removeApiBusiness}>Yes, Delete</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        </Modal.Footer>
      </Modal>

      {/* Suspend Modal */}
      <Modal position="center" show={isSuspendModalOpen} onClose={() => setIsSuspendModalOpen(false)}>
        <Modal.Header>Suspension Request</Modal.Header>
        <Modal.Body>
          <Label value='Provide the reason for suspension to proceed:' className='text-md' />
          <Textarea className="w-full p-2 mt-4" value={suspendReason} onChange={(e) => setSuspendReason(e.target.value)} placeholder="Type here...." />
        </Modal.Body>
        <Modal.Footer className='justify-end'>
          <Button outline color='gray' onClick={() => setIsSuspendModalOpen(false)}>Cancel</Button>
          <Button className='!bg-[#ff0000]' onClick={() => handleSuspend(suspendIndex)}>Suspend</Button>
        </Modal.Footer>
      </Modal>

      {/* View Business Modal */}
      {/* <Modal position="center" show={!!viewBusiness} onClose={handleCloseModal}>
        <Modal.Header>Business Details</Modal.Header>
        <Modal.Body>
          Display business details here
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default AllBusinesses;
