import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'

function Projects() {
  const [allproject, setAllProject] = useState([])
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectApi(searchKey, reqHeader)
      // console.log(result);
      setAllProject(result.data)
    }
  }
  console.log(allproject);
  console.log(token);
  console.log(searchKey);

  useEffect(() => {
    getAllProject()
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  return (
    <>
      <Header />
      <div className='my-5'>
        <h3 className='text-center'>All Projects</h3>

        {!token ?
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" className='w-25 mt-5' />
                <h6 className='text-danger mt-5'>Please <Link to={'/login'}>Login</Link> to See More Projects</h6>
              </div>
              <div className='col-md-3'></div>
            </div>
          </div>

          :

          <div className='mt-5'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4 d-flex'>
                  <input type="text" placeholder='Technologies' className='form-control shadow' onChange={(e) => setSearchKey(e.target.value)} />
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'lightgray', marginTop: '11.5px', marginLeft: '-30px' }} />
                </div>
                <div className='col-md-4'></div>
              </div>
            </div>

            <div className='container-fluid p-md-5 p-4 mt-4'>
              <div className='row'>
                {allproject?.map((item) => (
                  <div className='col-md-3'>
                    <ProjectCard project={item} />
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Projects