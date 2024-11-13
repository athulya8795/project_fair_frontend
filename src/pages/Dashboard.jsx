import React, { useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  // const [userName, setUserName] = useState("")
    const user = JSON.parse( sessionStorage.getItem("existingUser"))
    console.log(user.username);
 
  return (
    <>
      <Header />
      <div className='p-4'>
        <h4>Welcome <span className='text-warning'>{user.username}</span></h4>
        <Container>
          <Row className='mt-5'>
            <Col sm={12} md={8}>
              <Myproject />
            </Col>
            <Col sm={12} md={4}>
              <Profile />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Dashboard