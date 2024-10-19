import Navbar from '../UI/Navbar';
import '../UI/All.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

function UserInfo() {
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const user_id = query.get('user_id');

    const fetchData = async () => {
        if (!user_id) {
            console.warn('No user ID provided');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`https://6708bca98e86a8d9e42fd4ae.mockapi.io/CRUD/users?user_id=${user_id}`);
            const data = response.data;
            const filteredData = data.filter(user => user.user_id === user_id);

            if (filteredData.length > 0) {
                const user = filteredData[0];
                const codeArray = Object.keys(user)
                    .filter(key => key !== 'password' && key !== 'user_id' && key !== 'id')
                    .map(key => ({ code: key, value: user[key] }));

                setCodes(codeArray);
            } else {
                setError('No user found with the provided user ID.');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            setError('Error fetching user information.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-color' style={{ minHeight: '100vh' }}>
            <Navbar />

            <section>
                <MDBContainer className="py-5">
                    <MDBRow />
                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <p className="text-muted mb-1">{user_id}</p>
                                  
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    {loading ? (
                                        <MDBCardText>Loading...</MDBCardText>
                                    ) : error ? (
                                        <MDBCardText className="text-danger">{error}</MDBCardText>
                                    ) : (
                                        <MDBRow>
                                            <h1>Status of Asset</h1>
                                            {codes.map((code) => (
                                                <MDBCol sm="6" key={code.code}>
                                                    <MDBCard className="mb-3">
                                                        <MDBCardBody>
                                                            <MDBCardText className="fw-bold">{code.code}</MDBCardText>
                                                            <MDBCardText className="text-muted">{code.value}</MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                            ))}
                                        </MDBRow>
                                    )}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    );
}

export default UserInfo;
