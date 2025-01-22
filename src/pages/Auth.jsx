import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import lockPhoto from '../assets/lock.jpg'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { loginApi, registerApi } from '../services/allApi'
import { loginResponseContext } from '../context/Contextshare';

function Auth({ register }) {
  const navigate = useNavigate()
  const {setLoginResponse} = useContext(loginResponseContext)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('please will the form completely')
    }
    else {
      const result = await registerApi(userDetails)
      if (result.status == 200) {
        toast.success('Registration successfully')
        setLoginResponse(true)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 406) {
        toast.warning(result.response.data)
      }
      else {
        toast.error('Something went wrong')
      }
    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('Please fill the form completely')
    }
    else {
      const result = await loginApi({ email, password })
      if (result.status == 200) {
        toast.success('Login successfull')

        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
      else if (result.status == 406) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  return (
    <>
      <div className='container-fluid mt-5 w-75'>
        <h6><Link to={'/'} className='text-warning' style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back Home</Link></h6>
        <div className='row d-flex bg-success'>
          <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
            <img src={lockPhoto} alt="no image" />
          </div>
          <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
            <h1 className='fs-3 ms-5 text-light mt-5'><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h1>
            {!register ? <h4 className='text-light'>Sign In to Your Account</h4> :
              <h4 className='text-light'>Sign Up to Your Account</h4>}
            {register &&
              <div className='w-75'>
                <input type="text" placeholder='Username' className='form-control mt-5' value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
              </div>
            }
            <div className='w-75'>
              <input type="text" placeholder='Email Id' className='form-control mt-3' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
            </div>
            <div className='w-75'>
              <input type="password" placeholder='Password' className='form-control mt-3' value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
            </div>
            {!register ? <div className='w-75 mt-2'>
              <button className='btn btn-warning w-100' onClick={handleLogin}>Login</button>
              <p className='mt-2'>New User? click Here to <Link to={'/register'} className='text-warning rounded-0'>Register</Link></p>
              </div>
              :
              <div className='w-75 mt-2'>
                <button className='btn btn-warning w-100' onClick={handleRegister}>Register</button>
                <p className='mt-2'>New User? click Here to <Link to={'/login'} className='text-warning rounded-0'>Login</Link></p>
                </div>}
          </div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Auth