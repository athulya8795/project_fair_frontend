import { faFacebook, faGithub, faInstagram, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
    return (
        <>
            <div className='p-5 bg-success mt-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h4 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h4>
                        <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, illum? Autem ea ratione perspiciatis adipisci maxime rem at nostrum voluptatum. Voluptatibus quibusdam quos, temporibus quo unde magnam voluptas pariatur dicta!</p>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2'>
                        <h4 className='text-light'>Links</h4>
                        <p>Home</p>
                        <p>Projects</p>
                        <p>Dashboard</p>
                    </div>
                    <div className='col-md-2'>
                        <h4 className='text-light'>Guides</h4>
                        <p>React</p>
                        <p>React Bootstrap</p>
                        <p>Bootswatch</p>
                    </div>
                    <div className='col-md-3'>
                        <h4 className='text-light'>Contact Us</h4>
                        <div className='d-flex mt-3'>
                            <input type="text" placeholder='Mail ID' className='form-control rounded-0' />
                            <button className='btn btn-warning ms-2 rounded-0'>Subscribe</button>
                        </div>
                        <div className='d-flex mt-3 justify-content-between'>
                            <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light' />
                            <FontAwesomeIcon icon={faTwitter} className='fa-2x text-light' />
                            <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light' />
                            <FontAwesomeIcon icon={faGithub} className='fa-2x text-light' />
                            <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer