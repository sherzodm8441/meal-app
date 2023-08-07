import React, { useState } from 'react';
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

function App() {

    const [form, setForm] = React.useState({
        loginUsername: '',
        loginPassword: '',
        signupUsername: '',
        signuPassword: ''
    });

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.id]: event.target.value,
        });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
    
        console.log(form.loginUsername + ' ' + form.loginPassword);
        // console.log(form.signupUsername + ' ' + form.signuPassword);
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
    
        // console.log(form.loginUsername + ' ' + form.loginPassword);
        console.log(form.signupUsername + ' ' + form.signupPassword);
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

    {/* <div className="text-center mb-3">
      <p>Sign in with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>
      </div>

      <p className="text-center mt-3">or:</p>
    </div> */}
    <form onSubmit={handleLoginSubmit}>
        <MDBInput wrapperClass='mb-4' label='Username' id='loginUsername' type='text' value={form.loginUsername} onChange={handleChange}/>
        <MDBInput wrapperClass='mb-4' label='Password' id='loginPassword' type='password' value={form.loginPassword} onChange={handleChange}/>

        {/* <div className="d-flex justify-content-between mx-4 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
        </div> */}

        <MDBBtn className="mb-4 w-100" style={{backgroundColor: '#0d4d63', color: 'lightcyan'}} type="submit">Sign in</MDBBtn>
        {/* <p className="text-center">Not a member? <a href="#!">Register</a></p> */}
    </form>
  </MDBTabsPane>

  <MDBTabsPane show={justifyActive === 'tab2'}>

    {/* <div className="text-center mb-3">
      <p>Sign in with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>
      </div>

      <p className="text-center mt-3">or:</p>
    </div> */}
    <form onSubmit={handleSignupSubmit}>
        {/* <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/> */}
        <MDBInput wrapperClass='mb-4' label='Username' id='signupUsername' type='text' value={form.signupUsername} onChange={handleChange}/>
        {/* <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/> */}
        <MDBInput wrapperClass='mb-4' label='Password' id='signupPassword' type='password' value={form.signupPassword} onChange={handleChange}/>

        {/* <div className='d-flex justify-content-center mb-4'>
        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
        </div> */}

        <MDBBtn className="mb-4 w-100" style={{backgroundColor: '#0d4d63', color: 'lightcyan'}} type="submit">Sign up</MDBBtn>
    </form>

  </MDBTabsPane>

</MDBTabsContent>

</MDBContainer>
      
      </div>
  );
}

export default App;