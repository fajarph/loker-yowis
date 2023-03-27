import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { useNavigate } from 'react-router-dom';

const JobDetail = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [salary, setSalary] = useState("");
    const [jobRole, steJobRole] = useState("");
    const [jobLevel, setJobLevel] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobShortDescription, setJobShortDescription] = useState("");
    const [jobLongDescription, setJobLongDescription] = useState("")
    const [education, setEducation] = useState("");
    const [industry, setIndustry] = useState("");
    const [createdAt, setCreatedAt] = useState("")
    const [url, setUrl] = useState("")
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user, isError} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        getJobDetail()
        dispatch(getMe())
    }, []);

    useEffect(() => {
        if(isError){
            navigate("/")
        }   
    }, [isError, navigate]);

    const getJobDetail = async () => {
        const response = await axios.get(`http://localhost:5000/jobs/${id}`)
        setCompanyName(response.data.companyName)
        setCompanyAddress(response.data.companyAddress)
        setSalary(response.data.salary)
        steJobRole(response.data.jobRole)
        setJobLevel(response.data.jobLevel)
        setJobType(response.data.jobType)
        setJobShortDescription(response.data.jobShortDescription)
        setJobLongDescription(response.data.jobLongDescription)
        setEducation(response.data.education)
        setIndustry(response.data.industry)
        setCreatedAt(response.data.createdAt)
        setUrl(response.data.url)
    }

    return(
        <div>
            <Navbar/>
            <div className="job-detail">
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <div className="entry-content">
                                    <div className="card mt-5">
                                        <div className="card-body">
                                            <h4 className="fw-bold">Lowongan Kerja</h4>
                                            <div className="d-flex justify-content-between mt-2 ms-2 me-5">
                                                <h6><i className="bi bi-building-fill"></i> {companyName}</h6>
                                                <h6><i className="bi bi-geo-alt-fill"></i> {companyAddress}</h6>
                                                <h6><i className="bi bi-folder-fill"></i> {jobRole}</h6>
                                                <h6><i className="bi bi-cash"></i> {salary}</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h6>Level Pekerjaan : {jobLevel}</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Industri : {industry}</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Pendidikan : {education}</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Tipe Pekerjaan : {jobType}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4 mb-5">
                                        <div className="card-body">
                                            <h6 className="fw-bold">Posted Date: {createdAt}</h6>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div dangerouslySetInnerHTML={{__html: jobLongDescription}} />
                                            </div>
                                            <div className="card">
                                            <div className="card-body">
                                                <div className='d-flex justify-content-end mb-3'>

                                                    {user && user.role === "Admin" && (
                                                        <Link to={`/edit/jobs/${id}`} type="button" className="btn btn-dark me-1">Edit Jobs</Link>
                                                    )}

                                                    {user && user.role === "User" && (
                                                        <button type="button" className="btn btn-dark me-1"><i class="bi bi-star"></i> SIMPAN</button>
                                                    )}

                                                    {user && user.role === "User" && (
                                                        <button type="button" className="btn btn-dark">LAMAR PEKERJAAN</button>
                                                    )}
                                                    
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
                                            <h5 className="fw-bold"><i className="bi bi-building-fill"></i> Profile Perusahaan</h5>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center">
                                                    <img className='image rounded-circle' alt="Image" src={url} style={{width: "100px", height: "100px"}}/>
                                                </div>
                                                <div className="mt-4">
                                                    <h6 className="fw-bold text-secondary">Deskripsi Perusahaan</h6>
                                                    <p>{jobShortDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <h5 className="fw-bold"><i class="bi bi-briefcase-fill"></i> Lowongan Serupa</h5>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="d-flex justify-content-center col-3">
                                                        <img className='image rounded-circle' alt="Image" src={url} style={{width: "60px", height: "60px"}}/>
                                                    </div>
                                                    <div className="d-flex justify-content-center col-9">
                                                        <div className="row me-5">
                                                            <h5 className="fw-bold text-secondary">Job Role</h5>
                                                            <p className="text-secondary">Company Name</p>
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
            </div>
        </div>
    )
}

export default JobDetail