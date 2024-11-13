import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBoxOpen, FaEdit, FaExclamationTriangle, FaSpinner, FaTrash, FaUserCircle } from 'react-icons/fa'
import { Button, Modal, Table } from 'flowbite-react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { FaArrowsRotate } from 'react-icons/fa6'

const AllUser = () => {
  const [editingUser, setEditingUser] = useState(null)
  const [apiUser, setApiUser] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const FetchUsers = async () => {
    setLoading(true)  // Set loading to true when fetching data
    setError(null)    // Reset any previous errors
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/list-users/`, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`
        }
      })
      setApiUser(response.data)
    } catch (e) {
      setError("Failed to fetch users. Please try again later.")  // Handle error
      console.error(e)
    } finally {
      setLoading(false)  // Set loading to false after the request completes
    }
  }

  useEffect(() => {
    FetchUsers()
  }, [])

  const removeApiUser = async () => {
    const userEmail = apiUser[deleteIndex].email
    try {
      await axios.delete(`${import.meta.env.REACT_APP_API_URL}/api/delete/`, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`
        },
        data: { email: userEmail }
      })
      const updatedApiUser = apiUser.filter((_, i) => i !== deleteIndex)
      setApiUser(updatedApiUser)
    } catch (error) {
      setError("Failed to delete user. Please try again later.")
      console.error("Error deleting user:", error)
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  const confirmDelete = (index) => {
    setDeleteIndex(index)
    setIsDeleteModalOpen(true)
  }

  const handleApiEditClick = (index) => {
    setEditingUser(apiUser[index])
    setIsEditModalOpen(true)
  }

  const handleApiSaveClick = async () => {
    const userEmail = editingUser.email
    try {
      await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/edit-user/`, {
        email: userEmail,
        ...editingUser
      }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`
        }
      })
      const updatedApiUser = apiUser.map((user) =>
        user.email === editingUser.email ? editingUser : user
      )
      setApiUser(updatedApiUser)
      setIsEditModalOpen(false)
    } catch (error) {
      setError("Failed to update user. Please try again later.")
      console.error("Error updating user:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditingUser((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-lg lg:text-2xl font-bold text-gray-700 ">
          Manage Users
        </h1>
        <div className="flex items-center gap-5">
          <Button as={Link} to='/admin/add-users' className="!bg-main_color text-white !font-semibold">
            <FaUserCircle className="mr-2 h-5 w-5" />
            Add User
          </Button>
          <button onClick={FetchUsers} className="cursor-pointer text-main_color rounded-full p-3 bg-gray-200 hover:bg-gray-300">
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
            <Table.HeadCell className='bg-main_color text-white text-center'>Date Joined</Table.HeadCell>
            <Table.HeadCell className="bg-main_color text-white text-center">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="bg-white divide-y">
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan="5" className="bg-white text-center py-4">
                  <FaSpinner className="animate-spin text-2xl text-gray-600 inline-block mr-2" />
                  Loading...
                </Table.Cell>
              </Table.Row>
            ) : error ? (
              <Table.Row>
                <Table.Cell colSpan="5" className="bg-white text-center py-4 text-red-500">
                  <FaExclamationTriangle className="text-2xl inline-block mr-2" />
                  {error}
                </Table.Cell>
              </Table.Row>
            ) : apiUser.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan="5" className="bg-white text-center py-4 text-gray-600">
                  <FaBoxOpen className="text-2xl inline-block mr-2" />
                  No users found.
                </Table.Cell>
              </Table.Row>
            ) : (
              apiUser.map((user, index) => (
                <Table.Row key={index}>
                  <Table.Cell className='text-center'>{index + 1}</Table.Cell>
                  <Table.Cell className='text-center'>{user.fullname}</Table.Cell>
                  <Table.Cell className='text-center'>{user.email}</Table.Cell>
                  <Table.Cell className='text-center'>{user.date}</Table.Cell>
                  <Table.Cell className='text-center'>
                    <div className="flex items-center justify-center space-x-4">
                      <FaEdit
                        title='Edit'
                        onClick={() => handleApiEditClick(index)}
                        className="cursor-pointer text-blue-500"
                      />
                      <FaTrash
                        title='Delete'
                        onClick={() => confirmDelete(index)}
                        className="cursor-pointer text-red-500"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Edit User Modal */}
      <Modal position="center" show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={editingUser?.fullname || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                value={editingUser?.email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
            </div>
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
            onClick={handleApiSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal position="center" show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={removeApiUser}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AllUser
