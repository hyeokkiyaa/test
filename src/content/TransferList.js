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
import searchIcon from './search.svg';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Crud() {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const [modalShow, setModalShow] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const query = new URLSearchParams(location.search);
    const user_id = query.get('user_id');

    const fetchData = async () => {
        if (!user_id) {
            console.warn('No user ID provided');
            return;
        }

        try {
            const response = await axios.get(`https://6708bcb98e86a8d9e42fd4e3.mockapi.io/crud/${user_id}`);
            setOriginalData(response.data);
            setFilteredData(response.data);
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
            setOriginalData(prevData => prevData.filter(item => item.id !== itemId));
            setFilteredData(prevData => prevData.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdate = (itemId, index) => {
        const currentItem = filteredData[index];
        setCurrentItem(currentItem);
        setModalShow(true);
    };

    useEffect(() => {
        if (user_id) {
            fetchData();
        }
    }, [user_id]);

    const filtering = (event) => {
        event.preventDefault();

        const option = document.getElementById('filter-option').value;
        const query = document.getElementById('search-input').value.toLowerCase();

        let filteredTitles = [];

        if (option === 'Title') {
            filteredTitles = originalData.filter(item => item.title.toLowerCase().includes(query));
        } else if (option === 'BeforeCurrency') {
            filteredTitles = originalData.filter(item => item.beforeCurrency.toLowerCase().includes(query));
        } else if (option === 'AfterCurrency') {
            filteredTitles = originalData.filter(item => item.afterCurrency.toLowerCase().includes(query));
        }

        setFilteredData(filteredTitles);
        setPage(1);
    }

    const startIndex = (page - 1) * limit;
    const paginatedTitles = filteredData.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(filteredData.length / limit);

    return (
        <div className='bg-color' style={{ minHeight: '100vh' }}>
            <Navbar />
            <Form className='search bottom' onSubmit={filtering}>
                <Row>
                    <Col className='drop-down'>
                        <Form.Select id="filter-option" defaultValue="Title">
                            <option value="Title">Title</option>
                            <option value="BeforeCurrency">Before Currency</option>
                            <option value="AfterCurrency">After Currency</option>
                        </Form.Select>
                    </Col>
                    <Col xs>
                        <Form.Control id="search-input" placeholder="Search..." />
                    </Col>
                    <Col>
                        <Button variant="white" type="submit">
                            <img src={searchIcon} alt="search" style={{ width: '20px', height: '20px' }} />
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered className="table-custom table-responsive width">
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
                        paginatedTitles.map((item, index) => (
                            <tr key={item.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                                <td className='currency'>{item.beforeCurrency}</td>
                                <td>{item.beforeMoney}</td>
                                <td>{item.afterCurrency}</td>
                                <td>{item.afterMoney}</td>
                                <td>
                                    <button onClick={() => handleUpdate(item.id, startIndex + index)} style={{ border: 'none', background: 'none' }}>
                                        <img src={updateIcon} alt="Update" style={{ width: '20px', height: '20px' }} />
                                    </button>

                                    <button onClick={() => handleDelete(item.id)} style={{ border: 'none', background: 'none' }}>
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
                    total={filteredData.length}
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
                user_id={user_id}
                fetchData={fetchData}
            />
        </div>
    );
}

export default Crud;

