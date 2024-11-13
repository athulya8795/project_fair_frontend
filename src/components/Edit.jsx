import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';

function Edit({ projects }) {
    const {setEditResponse} = useContext(editResponseContext)
    const [preview, setPreview] = useState("")
    const [key, setKey] = useState(0)
    const [projectDetails, setProjectDetails] = useState({
        title: projects.title,
        language: projects.language,
        github: projects.github,
        website: projects.website,
        overview: projects.overview,
        projectImage: ""
    })
    // console.log(projectDetails);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        handleCancel()
    }
    const handleShow = () => setShow(true);

    const handleFile = (e) => {
        setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
    }
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    // console.log(preview);

    const handleCancel = () => {
        setProjectDetails({
            title: projects.title,
            language: projects.language,
            github: projects.github,
            website: projects.website,
            overview: projects.overview,
            projectImage: ""
        })
        setPreview("")
        if (key == 0) {
            setKey(1)
        }
        else {
            setKey(0)
        }
    }

    const handleUpdate = async () => {
       const { title, language, github, website, overview ,projectImage} = projectDetails
        if (!title || !language || !github || !website || !overview) {
            toast.info('Please fill the form Completely')
        }
        else {
            //api
            const reqBody = new FormData
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", projects.projectImage)
            const token = sessionStorage.getItem("token")

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `bearer ${token}`
                }
                const result = await updateUserProjectApi(projects._id, reqBody, reqHeader)
                // console.log(result);
                if(result.status==200){
                    setEditResponse(result)
                    
                    toast.success('Project Updated Success')
                    setTimeout(()=>{
                        handleClose()
                    },2000)
                }
                else{
                    handleCancel()
                    toast.error('Something went wrong')
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateUserProjectApi(projects._id, reqBody, reqHeader)
                // console.log(result);
                if(result.status==200){
                    setEditResponse(result)
                    toast.success('Project Updated Success')
                    setTimeout(()=>{
                        handleClose()
                    },2000)
                }
                else{
                    handleCancel()
                    toast.error('Something went wrong')
                }
            }
        }
    }

    return (
        <>
            <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='mx-3' style={{ color: 'rgb(160,98,192)' }} />

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor="Project">
                                    <input type="file" id="Project" style={{ display: 'none' }} key={key} onChange={(e) => handleFile(e)} />
                                    <img src={preview ? preview : `${serverUrl}/upload/${projects.projectImage}`} alt="no image" className='w-100' />
                                </label>
                            </div>
                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input type="text" placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                                </div>
                                <div className='mb-3'>
                                    <input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                                </div>
                                <div className='mb-3'>
                                    <input type="text" placeholder='Github' className='form-control' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                                </div>
                                <div className='mb-3'>
                                    <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                                </div>
                                <div className='mb-3'>
                                    <textarea rows={5} placeholder='Overview' className='form-control' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
                <ToastContainer theme='colored' position='top-center' autoClose={2000} />
            </Modal>
        </>
    )
}

export default Edit