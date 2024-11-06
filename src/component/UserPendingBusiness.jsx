import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserHeader from '../component/UserHeader';
import UserSidebar from '../component/UserSidebar';
import '../assets/userManage.css';
import Cookies from 'js-cookie';

const UserPendingBusiness = () => {
    const [pendingBusinesses, setPendingBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                const userPendingBusinesses = response.data.filter(business =>
                    business.status === 'pending'
                );
                setPendingBusinesses(userPendingBusinesses);
            } catch (error) {
                setError('Error fetching businesses. Please check your network connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className="user-content">
                <h1>Your Pending Businesses</h1>

                {loading ? (
                    <p>Loading pending businesses...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : pendingBusinesses.length > 0 ? (
                    <div className="table-responsive">
                        <table className="pending-business-table">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingBusinesses.map(business => (
                                    <tr key={business.id}>
                                        <td>{business.companyname}</td>
                                        <td>{business.email}</td>
                                        <td>{business.phonenumber}</td>
                                        <td>{business.status}</td>
                                        <td>{business.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No pending businesses found.</p>
                )}
            </div>
        </div>
    );
};

export default UserPendingBusiness;
