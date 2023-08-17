import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function Modal(props) {


  const toggleShow = () => {
        props.handleModal();
    };

  return (
    <>
      {/* <MDBBtn onClick={toggleShow}>Vertically centered modal</MDBBtn> */}

      <MDBModal tabIndex='-1' show={props.value} setShow={props.value}>
        <MDBModalDialog centered>
          <MDBModalContent>
            {/* <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader> */}
            <MDBModalBody>
              <p>
                Please, Signin to make changes.
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              {/* <MDBBtn>Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}