import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa'
import '../assets/All-users.css'
import axios from 'axios'
import Cookies from 'js-cookie'

const AllUser = () => {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editedUser, setEditedUser] = useState({})
  const [apiUser, setApiUser] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.REACT_APP_API_URL}/api/list-users/`, {
      headers: {
        Authorization: `Token ${Cookies.get('token')}`
      }
    })
      .then(response => {
        setApiUser(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const removeApiUser = async (index) => {
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
      console.error("Error deleting user:", error)
    } finally {
      setIsModalOpen(false)
    }
  }

  const confirmDelete = (index) => {
    setDeleteIndex(index)
    setIsModalOpen(true)
  }

  const handleApiEditClick = (index) => {
    setEditingIndex(index)
    setEditedUser(apiUser[index])
  }

  const handleApiSaveClick = async (index) => {
    const userEmail = apiUser[index].email
    try {
      await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/edit-user/`, {
        email: userEmail,
        ...editedUser
      }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`
        }
      })

      const updatedApiUser = apiUser.map((user, i) =>
        i === index ? { ...user, ...editedUser } : user
      )
      setApiUser(updatedApiUser)
      setEditingIndex(null)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="all-users">
        <div className='all-header'>
          <h1>User List</h1>
          <Link to="/add-users" className="add-user-button">Add User</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiUser.map((value, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="fullname"
                      value={editedUser.fullname || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    value.fullname
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    value.email
                  )}
                </td>
                <td>{value.date}</td>
                <td>
                  {editingIndex === index ? (
                    <FaSave title='save' onClick={() => handleApiSaveClick(index)} className="icon save-icon" style={{ height: '20px' }} />
                  ) : (
                    <>
                      <FaEdit title='edit' onClick={() => handleApiEditClick(index)} className="icon edit-icon" style={{ height: '20px' }} />
                      <FaTrash title='delete' onClick={() => confirmDelete(index)} className="icon remove-icon" style={{ height: '20px' }} />
                    </>
                  )}
                </td>
              </tr>
            ))}

            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Confirm Deletion</h2>
                  <p>Are you sure you want to delete this user?</p>
                  <div className="modal-actions">
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button onClick={() => removeApiUser(deleteIndex)}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUser
