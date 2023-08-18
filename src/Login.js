import React, { useState } from 'react';
import axios from "axios";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

import { useNavigate } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker';


function App() {

    const [form, setForm] = React.useState({
        loginUsername: '',
        loginPassword: '',
        signupUsername: '',
        signupPassword: ''
    });

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.id]: event.target.value,
        });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        
        // trackPromise(
        //     await axios.post('https://meal-app-backend-ihtf.onrender.com/api/auth/user/login', {
        //         username: form.loginUsername,
        //         password: form.loginPassword
        //     }).then((response) => {
        //         // console.log(response); 
                // setUser(response.data);
                // localStorage.setItem("user", JSON.stringify(response.data));
                // // navigate("/");
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     }
        //     )
        // )

        let data = JSON.stringify({
            "username": form.loginUsername,
            "password": form.loginPassword
        });


        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://meal-app-backend-ihtf.onrender.com/api/auth/user/login',
        headers: { 
            'Content-Type': 'application/json'
          },
        data : data
        };

        trackPromise(
            axios.request(config)
            .then((response) => {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");

            })
            .catch((error) => {
            console.log(error);
            })
        )
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();


        let data = JSON.stringify({
            "username": form.signupUsername,
            "password": form.signupPassword
        });


        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://meal-app-backend-ihtf.onrender.com/api/auth/user',
        headers: { 
            'Content-Type': 'application/json'
            },
        data : data
        };

        trackPromise(
            axios.request(config)
            .then((response) => {
                let config2 = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://meal-app-backend-ihtf.onrender.com/api/auth/user/login',
                    headers: { 
                        'Content-Type': 'application/json'
                        },
                    data : data
                };
            
                
                axios.request(config2)
                .then((response) => {
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/");
    
                })
                .catch((error) => {
                console.log(error);
                })
                

            })
            .catch((error) => {
            console.log(error);
            })
        )
        
    };

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };



  return (
      <div>
          
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
            <MDBTabsLink style={{color: '#0d4d63'}} onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink style={{color: '#0d4d63'}} onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
            </MDBTabsLink>
        </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>
            <form onSubmit={handleLoginSubmit}>
                <MDBInput wrapperClass='mb-4' label='Username' id='loginUsername' type='text' value={form.loginUsername} onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='loginPassword' type='password' value={form.loginPassword} onChange={handleChange}/>

                <MDBBtn className="mb-4 w-100" style={{backgroundColor: '#0d4d63', color: 'lightcyan'}} type="submit">Sign in</MDBBtn>
            </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
            <form onSubmit={handleSignupSubmit}>
                <MDBInput wrapperClass='mb-4' label='Username' id='signupUsername' type='text' value={form.signupUsername} onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='signupPassword' type='password' value={form.signupPassword} onChange={handleChange}/>

                <MDBBtn className="mb-4 w-100" style={{backgroundColor: '#0d4d63', color: 'lightcyan'}} type="submit">Sign up</MDBBtn>
            </form>

        </MDBTabsPane>

        </MDBTabsContent>

        </MDBContainer>
      
      </div>
  );
}

export default App;