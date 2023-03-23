import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios'

const JobDetail = () => {
    const [jobLongDescription, setJobLongDescription] = useState("")
    const {id} = useParams()

    useEffect(() => {
        getJobLongDescriptionById()
    }, [])

    const getJobLongDescriptionById = async () => {
        const response = await axios.get(`http://localhost:5000/jobs/${id}`)
        setJobLongDescription(response.data.jobLongDescription)
    }

    

    return(
        <div>
            <Navbar/>
            <div className="job-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <div className="entry-content">
                                    <div className="card mt-5">
                                        <div className="card-body">
                                            <h4 className="fw-bold">Lowongan Kerja</h4>
                                            <div className="d-flex justify-content-between mt-2 ms-2 me-5">
                                                <h6>PT. KAMINDO SUKSES SELALU</h6>
                                                <h6>Jakarta Barat</h6>
                                                <h6>Grafis</h6>
                                                <h6>Negosiasi</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h6>Level Pekerjaan : Junior / Entry Level</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Industri :</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Pendidikan : Diploma/D1/D2/D3, Sarjana / S1, SMA / SMK / STM</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Tipe Pekerjaan : Purna Waktu / Full Time</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <h6 className="fw-bold">Posted Date: Maret 22, 2023</h6>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div dangerouslySetInnerHTML={{__html: jobLongDescription}} />
                                            </div>
                                            <div className="card">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-end mb-4'>
                                                    <button type="button" className="btn btn-dark me-1">SIMPAN</button>
                                                    <button type="button" className="btn btn-dark">LAMAR PEKERJAAN</button>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="job-company-details">
                                <div className="">
                                    <div className="card mt-5">
                                        <div className="card-body">
                                            <h5 className="fw-bold">Profile Perusahaan</h5>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h3>IMAGE</h3>
                                                </div>
                                                <div className="mt-4">
                                                    <h6 className="fw-bold text-secondary">Deskripsi Perusahaan</h6>
                                                    <p>{}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail