import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/images.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'

function Home() {
  const [isLogin, setISLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectApi()
    console.log(result);
    setHomeProject(result.data);
  }
  useEffect(() => {
    getHomeProject()
    if (sessionStorage.getItem("token")) {
      setISLogin(true)
    }
    else {
      setISLogin(false)
    }
  })
  return (
    <>
      <div style={{ height: '100vh' }} className='bg-success p-5'>
        <div className='container-fluid mt-5'>
          <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-6'>
              <h1 style={{ fontSize: '70px', color: 'white' }}>Project Fair</h1>
              <p>One stop destination for all software projects</p>
              {isLogin == false ? <Link to={'/login'}><button className='btn text-light p-0 mt-3'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link> :
                <Link to={'/dashboard'}><button className='btn text-light p-0 mt-3'>Manage Project <FontAwesomeIcon icon={faArrowRight} /></button></Link>}
            </div>
            <div className='col-md-6 mt-5 mt-md-0 d-flex justify-content-center'>
              <img src={photo} alt="no image" className='w-75' />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className=' text-center my-5'>Explore Our Project</h1>
        <div className='container'>
          <div className='row'>
            {homeProject?.map((item) => (
              <div className='col-md-4'>
                <ProjectCard project={item} />
              </div>
            ))}
          </div>
        </div>
        <Link to={'/projects'} className='text-danger'><p className='text-center my-4'>See more projects</p></Link>
      </div>
    </>
  )
}
export default Home