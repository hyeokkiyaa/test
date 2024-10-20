import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logo.svg';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useUser } from '../UserContext'; // UserContext에서 useUser를 가져옴

function Login() {
  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');
  const [wrongId, setWrongId] = useState(false);
  const [wrongPw, setWrongPw] = useState(false);
  const { setUserID } = useUser(); // 함수 호출 추가
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset error messages
    setWrongId(false);
    setWrongPw(false);

    // Check if fields are empty
    if (!user_id) {
      setWrongId(true); // Show wrong ID message
    }

    if (!password) {
      setWrongPw(true); // Show wrong password message
    }

    if (!user_id || !password) {
      return; // Exit function if either field is empty
    }

    try {
      // Fetch users from the API
      const response = await axios.get('https://6708bca98e86a8d9e42fd4ae.mockapi.io/CRUD/users');
      const users = response.data;

      // Check if the entered credentials match any user
      const user = users.find(user => user.user_id === user_id);

      if (user) {
        // If user exists, check password
        if (user.password === password) {
          // On successful login, navigate to content page
          setUserID(user.user_id);
          console.log('Login successful:', user);
          navigate(`/content/Dashboard?user_id=${user.user_id}`);
        } else {
          // Show password error message
          console.error('Invalid password');
          alert('Invalid password. Please try again.');
        }
      } else {
        // Show invalid ID error message
        console.error('Invalid credentials');
        alert('Invalid ID. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <MDBContainer fluid className='bg-color' style={{ minHeight: '100vh' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white text-dark my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <img src={logo} className="img-fluid" alt="logo image" />
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-dark'
                label='id'
                id='formControlLg'
                type='text'
                size="lg"
                value={user_id}
                onChange={(e) => setUser_id(e.target.value)}
              />
              {wrongId && <p id="wrongid" style={{ color: 'red' }}>Type ID</p>}
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-dark'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {wrongPw && <p id="wrongpw" style={{ color: 'red' }}>Type Password</p>}

              <MDBBtn outline className='mx-2 px-5' color='dark' size='lg' onClick={handleLogin}>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
