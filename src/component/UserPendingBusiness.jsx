import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Badge, Button, Table } from 'flowbite-react';
import { AiOutlineInfoCircle, AiFillExclamationCircle } from 'react-icons/ai';
import { FaBriefcase, FaBuilding, FaSpinner, FaUserShield } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/helpers';

const UserPendingBusiness = () => {
    const [pendingBusinesses, setPendingBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBusinesses = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/user-businesses/`, {
                params: {
                    q: 'pending'
                },
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

    useEffect(() => {
        fetchBusinesses();
    }, []);

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
                <h1 className="text-lg lg:text-2xl font-bold text-gray-700 ">
                    Your Pending Business Approvals
                </h1>
                <div className="flex items-center gap-5">
                    <Button as={Link} to='/member/all-businesses' className="!bg-main_color text-white !font-semibold">
                        <FaBriefcase className="mr-2 h-5 w-5" />
                        Manage Businesses
                    </Button>
                    <button onClick={fetchBusinesses} className="cursor-pointer text-main_color rounded-full p-3 bg-gray-200 hover:bg-gray-300">
                        <FaArrowsRotate className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table hoverable className="w-full">
                    <Table.Head className="">
                        <Table.HeadCell className='bg-main_color text-center text-white'>N/O</Table.HeadCell>
                        <Table.HeadCell className='bg-main_color text-center text-white'>Company Name</Table.HeadCell>
                        <Table.HeadCell className='bg-main_color text-center text-white'>Email</Table.HeadCell>
                        <Table.HeadCell className='bg-main_color text-center text-white'>Phone Number</Table.HeadCell>
                        <Table.HeadCell className='bg-main_color text-center text-white'>Status</Table.HeadCell>
                        <Table.HeadCell className='bg-main_color text-center text-white'>Date Created</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="bg-white divide-y">
                        {loading ? (
                            <Table.Row>
                                <Table.Cell colSpan="6" className="text-center py-8 text-gray-500">
                                    <FaSpinner className="animate-spin text-2xl text-gray-600 inline-block mr-2" />
                                    Loading pending businesses...
                                </Table.Cell>
                            </Table.Row>
                        ) : error ? (
                            <Table.Row>
                                <Table.Cell colSpan="6" className="text-center py-8 text-red-500">
                                    <AiFillExclamationCircle className="h-6 w-6 mr-2 inline-block" />
                                    {error}
                                </Table.Cell>
                            </Table.Row>
                        ) : pendingBusinesses.length > 0 ? (
                            pendingBusinesses.map((business, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell className="text-center">{index + 1}</Table.Cell>
                                    <Table.Cell className="text-center whitespace-nowrap ">
                                        {business.companyname}
                                    </Table.Cell>
                                    <Table.Cell className="text-center">{business.email}</Table.Cell>
                                    <Table.Cell className="text-center">{business.phonenumber}</Table.Cell>
                                    <Table.Cell>
                                        <StatusBadge
                                            color='warning'
                                            beeperColor='bg-yellow-300'
                                            label={business.status}
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="text-center">{formatDate(business.created_at)}</Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan="6" className="text-center flex items-center justify-center py-8 text-gray-500">
                                    <AiOutlineInfoCircle className=" inline-block h-6 w-6 mr-2" />
                                    No pending businesses found.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default UserPendingBusiness;
