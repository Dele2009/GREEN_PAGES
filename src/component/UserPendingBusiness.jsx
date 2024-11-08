import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
                const userPendingBusinesses = response.data.filter(business => business.status === 'pending');
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
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-700 mb-6">Your Pending Businesses</h1>

            {loading ? (
                <p className="text-gray-500 text-lg">Loading pending businesses...</p>
            ) : error ? (
                <p className="text-red-500 text-lg">{error}</p>
            ) : pendingBusinesses.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="w-1/5 px-4 py-3 text-left text-sm font-semibold">Company Name</th>
                                <th className="w-1/5 px-4 py-3 text-left text-sm font-semibold">Email</th>
                                <th className="w-1/5 px-4 py-3 text-left text-sm font-semibold">Phone Number</th>
                                <th className="w-1/5 px-4 py-3 text-left text-sm font-semibold">Status</th>
                                <th className="w-1/5 px-4 py-3 text-left text-sm font-semibold">Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingBusinesses.map(business => (
                                <tr key={business.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2 text-gray-700">{business.companyname}</td>
                                    <td className="px-4 py-2 text-gray-700">{business.email}</td>
                                    <td className="px-4 py-2 text-gray-700">{business.phonenumber}</td>
                                    <td className="px-4 py-2 text-gray-700 capitalize">{business.status}</td>
                                    <td className="px-4 py-2 text-gray-700">{new Date(business.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 text-lg">No pending businesses found.</p>
            )}
        </div>
    );
};

export default UserPendingBusiness;
