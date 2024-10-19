import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../UI/Navbar';
import '../UI/All.css';
import Table from 'react-bootstrap/Table';
import './TransferList.css';
import { Pagination } from 'rsuite';
import ModalComponent from '../UI/ModalComponent';
import updateIcon from './update.svg';
import deleteIcon from './delete.svg';

function Crud() {
    const [titles, setTitles] = useState([]);
    const [id, setId] = useState([]);
    const [beforeCurrency, setBeforeCurrency] = useState([]);
    const [beforeMoney, setBeforeMoney] = useState([]);
    const [afterCurrency, setAfterCurrency] = useState([]);
    const [afterMoney, setAfterMoney] = useState([]);
    const [date, setDate] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const location = useLocation();

    const [currentItem, setCurrentItem] = useState(null);
    const query = new URLSearchParams(location.search);
    const user_id = query.get('user_id');
    const [modalShow, setModalShow] = useState(false);

    const fetchData = async () => {
        if (!user_id) {
            console.warn('No user ID provided');
            return;
        }

        try {
            const response = await axios.get(`https://6708bcb98e86a8d9e42fd4e3.mockapi.io/crud/${user_id}`);
            setId(response.data.map(item => item.id));
            setDate(response.data.map(item => item.date));
            setTitles(response.data.map(item => item.title));
            setBeforeCurrency(response.data.map(item => item.beforeCurrency));
            setBeforeMoney(response.data.map(item => item.beforeMoney));
            setAfterCurrency(response.data.map(item => item.afterCurrency));
            setAfterMoney(response.data.map(item => item.afterMoney));
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };

    const handleDelete = async (itemId) => {
        if (!user_id) {
            console.warn('No user ID provided');
            return;
        }

        const confirmed = window.confirm("You really want to delete?");
        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(`https://6708bcb98e86a8d9e42fd4e3.mockapi.io/crud/${user_id}/${itemId}`);
            setTitles(prevTitles => prevTitles.filter((_, index) => id[index] !== itemId));
            setId(prevId => prevId.filter(existingId => existingId !== itemId));
            setDate(prevDate => prevDate.filter((_, index) => id[index] !== itemId));
            setBeforeCurrency(prevBeforeCurrency => prevBeforeCurrency.filter((_, index) => id[index] !== itemId));
            setBeforeMoney(prevBeforeMoney => prevBeforeMoney.filter((_, index) => id[index] !== itemId));
            setAfterCurrency(prevAfterCurrency => prevAfterCurrency.filter((_, index) => id[index] !== itemId));
            setAfterMoney(prevAfterMoney => prevAfterMoney.filter((_, index) => id[index] !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdate = (itemId, index) => {
        const currentItem = {
            id: itemId,  // Ensure `id` is properly set
            title: titles[index],
            date: date[index],
            beforeCurrency: beforeCurrency[index],
            beforeMoney: beforeMoney[index],
            afterCurrency: afterCurrency[index],
            afterMoney: afterMoney[index]
        };
    
        setCurrentItem(currentItem);
        setModalShow(true);
    };
    


    useEffect(() => {
        if (user_id) {
            fetchData();
        }
    }, [user_id]);

    const startIndex = (page - 1) * limit;
    const paginatedTitles = titles.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(titles.length / limit);

    return (
        <div className='bg-color' style={{ minHeight: '100vh' }}>
            <Navbar />
            <Table striped bordered className="table-custom">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Before Currency</th>
                        <th>Before Money</th>
                        <th>After Currency</th>
                        <th>After Money</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTitles.length > 0 ? (
                        paginatedTitles.map((title, index) => (
                            <tr key={index}>
                                <td>{startIndex + index + 1}</td>
                                <td>{title}</td>
                                <td>{date[startIndex + index]}</td>
                                <td>{beforeCurrency[startIndex + index]}</td>
                                <td>{beforeMoney[startIndex + index]}</td>
                                <td>{afterCurrency[startIndex + index]}</td>
                                <td>{afterMoney[startIndex + index]}</td>
                                <td>
                                    <button onClick={() => handleUpdate(id[startIndex + index], startIndex + index)} style={{ border: 'none', background: 'none' }}>
                                        <img src={updateIcon} alt="Update" style={{ width: '20px', height: '20px' }} />
                                    </button>

                                    <button onClick={() => handleDelete(id[startIndex + index])} style={{ border: 'none', background: 'none' }}>
                                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No data found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className='table-custom bottom'>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    total={titles.length}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                />
            </div>

            <ModalComponent
                show={modalShow}
                onHide={() => setModalShow(false)}
                currentItem={currentItem}
                user_id={user_id} // Pass the user_id to ModalComponent
                fetchData={fetchData} // Pass the fetchData function to refresh data after update
            />

        </div>
    );
}

export default Crud;
