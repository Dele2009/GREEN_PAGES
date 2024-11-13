import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaSpinner, FaPlusSquare, FaUserShield, FaCheckCircle } from 'react-icons/fa';
import { Button, Modal, Table } from 'flowbite-react';
import Cookies from 'js-cookie';
import { showToast } from '../utils/Toast';
import { AiFillExclamationCircle, AiOutlineInfoCircle, AiOutlineLoading } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaArrowsRotate } from 'react-icons/fa6';

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState({ fullname: '', email: '' });
  const [loading, setLoading] = useState(false);

  // State for handing deleting process
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAdmins = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/manage-admins/`, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      console.log(response.data);
      setAdmins(response.data);
    } catch (error) {
      console.log(error)
      setError('Failed to load admins. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (adminId) => {
    setDeletingId(Number(adminId))
    setDeleteModal(true)
  }

  const handleDeleteSubmit = async () => {
    setIsDeleting(true)
    console.log(deletingId)
    try {
      await axios.delete(`${import.meta.env.REACT_APP_API_URL}/api/admins/${deletingId}/`, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setAdmins(prev => prev.filter((admin) => admin.id !== deletingId))
      showToast('success', 'Admin Deleted successfully')
    } catch (error) {
      console.log(error)
      showToast('error', 'Failed to delete admin. Please try again.');
    } finally {
      setIsDeleting(false)
      setDeleteModal(false)
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setUpdatedAdmin({ fullname: admin.fullname, email: admin.email });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.REACT_APP_API_URL}/api/admins/${selectedAdmin.id}/`,
        updatedAdmin,
        {
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
          },
        }
      );
      if (response.status === 200) {
        setAdmins(prev =>
          prev.map((admin) =>
            admin.id === selectedAdmin.id ? { ...admin, fullname: updatedAdmin.fullname, email: updatedAdmin.email } : admin
          )
        );
        setIsEditModalOpen(false);
        showToast('success', 'Details have been updated')
      } else {
        showToast('error', 'Failed to update admin details.');
      }
    } catch (error) {
      console.log(error)
      showToast('error', 'Error occurred while updating admin.');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-lg lg:text-2xl font-bold text-gray-700 ">
          Manage Admins.
        </h1>
        <div className="flex items-center gap-5">
          <Button as={Link} to='/admin/add-admin' className="!bg-main_color text-white !font-semibold">
            <FaUserShield className="mr-2 h-5 w-5" />
            Add Admin
          </Button>
          <button onClick={fetchAdmins} className="cursor-pointer text-main_color rounded-full p-3 bg-gray-200 hover:bg-gray-300">
            <FaArrowsRotate className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head className="">
            <Table.HeadCell className='bg-main_color text-white text-center'>N/O</Table.HeadCell>
            <Table.HeadCell className='bg-main_color text-white text-center'>Name</Table.HeadCell>
            <Table.HeadCell className='bg-main_color text-white text-center'>Email</Table.HeadCell>
            <Table.HeadCell className='bg-main_color text-white text-center'>Date Created</Table.HeadCell>
            <Table.HeadCell className='bg-main_color text-white text-center'>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y bg-white">
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center py-8 text-gray-500">
                  <FaSpinner className="animate-spin text-2xl text-gray-600 inline-block mr-2" />
                  Loading...
                </Table.Cell>
              </Table.Row>
            ) : error ? (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center py-8 text-red-500">
                  <AiFillExclamationCircle className="h-6 w-6 mr-2" />
                  {error}
                </Table.Cell>
              </Table.Row>
            ) : admins.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center py-8 text-gray-500">
                  <AiOutlineInfoCircle className="h-6 w-6 mr-2" />
                  No admins found.
                </Table.Cell>
              </Table.Row>
            ) : (
              admins.map((admin, index) => (
                <Table.Row key={index}>
                  <Table.Cell className='text-center'>{index + 1}</Table.Cell>
                  <Table.Cell className='text-center'>{admin.fullname}</Table.Cell>
                  <Table.Cell className='text-center'>{admin.email}</Table.Cell>
                  <Table.Cell className='text-center'>{admin.date}</Table.Cell>
                  <Table.Cell className='text-center'>
                    <div className="flex items-center justify-center space-x-4">
                      <FaEdit
                        className="cursor-pointer text-blue-500"
                        title="Edit"
                        onClick={() => handleEdit(admin)}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        title="Delete"
                        onClick={() => handleDelete(admin.id)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal position="center" show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Modal.Header>Edit Admin</Modal.Header>
        <Modal.Body>
          <div>
            <label className="block">Full Name</label>
            <input
              type="text"
              value={updatedAdmin.fullname}
              onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, fullname: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Full Name"
            />
          </div>
          <div className="mt-4">
            <label className="block">Email</label>
            <input
              type="email"
              value={updatedAdmin.email}
              onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, email: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      <Modal position="center" show={deleteModal} onClose={() => setDeleteModal(false)}>
        <Modal.Header className="">
          <div className="flex justify-center items-center gap-2">
            <FaCheckCircle className="text-main_color text-xl" />
            <span>Confirm Request</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">This Action can not be reverse, are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDeleteSubmit}
            className="px-4 py-2 bg-main_color text-white rounded-md transition"
          >
            {isDeleting ? <AiOutlineLoading className="size-7 animate-spin" /> : ' Confirm'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAdmin;
