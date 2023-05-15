import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './style/jobDetail.css'

const JobDetail = () => {
    const [jobsRoleByIds, setJobsRoleByIds] = useState([])
    const [companyName, setCompanyName] = useState("");
    const [titleCompanny, setTitleCompanny] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobShortDescription, setJobShortDescription] = useState("");
    const [jobLongDescription, setJobLongDescription] = useState("")
    const [industry, setIndustry] = useState("");
    const [Location, setLocation] = useState("")
    const [Role, setRole] = useState("")
    const [Level, setLevel] = useState("")
    const [Education, setEducation] = useState("")
    const [createdAt, setCreatedAt] = useState("2022-03-30T10:30:00.000Z")
    const [imageUrl, setImageUrl] = useState("")
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user, isError} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        getJobDetail()
        dispatch(getMe())
    }, []);

    useEffect(() => {
        getJobsRoleById()
    }, [Role.id, Location.id]);

    useEffect(() => {
        if(isError){
            navigate("/")
        }   
    }, [user, isError, navigate]);

    const getJobDetail = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobs/${id}`)
        setCompanyName(response.data.companyName)
        setTitleCompanny(response.data.titleCompanny)
        setSalary(response.data.salary)
        setJobType(response.data.jobType)
        setJobShortDescription(response.data.jobShortDescription)
        setJobLongDescription(response.data.jobLongDescription)
        setIndustry(response.data.industry)
        setEducation(response.data.Education)
        setLocation(response.data.Location)
        setRole(response.data.Role)
        setLevel(response.data.Level)
        setCreatedAt(response.data.createdAt)
        setImageUrl(response.data.imageUrl)
    }

    const getJobsRoleById = async () => {
        if (Role) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobsbyroleid?role_id=${Role.id}&location_id=${Location.id}&job_id=${id}`)
            setJobsRoleByIds(response.data);
        }
    }

    const formattedDate = moment(createdAt).format('MMMM DD, YYYY');

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
                                            <h4 className="fw-bold">Lowongan Kerja {titleCompanny}</h4>
                                            <div className="d-flex justify-content-between mt-2 ms-2 me-5">
                                                <h6>
                                                    <i className="bi bi-building-fill"></i> <Link className="custom-link" to={`/jobs?search_query=${companyName}`}> {companyName}</Link>
                                                </h6>
                                                <h6>
                                                    <i className="bi bi-geo-alt-fill"></i> <Link className="custom-link" to={`/jobs?LocationId=${Location.id}`}> {Location.name}</Link>
                                                </h6>
                                                <h6>
                                                    <i className="bi bi-folder-fill"></i> <Link className="custom-link" to={`/jobs?RoleId=${Role.id}`}> {Role.name}</Link>
                                                </h6>
                                                <h6>
                                                    <i className="bi bi-cash"></i> <Link className="custom-link" to={`/jobs?search_query=${salary}`}> {salary}</Link>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h6>Level Pekerjaan : <Link className="custom-link" to={`/jobs?LevelId=${Level.id}`}>{Level.name}</Link></h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Industri :<br/> <Link className="custom-link" to={`/jobs?search_query=${industry}`}>{industry}</Link></h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Pendidikan :<br/> <Link className="custom-link" to={`/jobs?EducationId=${Education.id}`}>{Education.name}</Link></h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Tipe Pekerjaan : <Link className="custom-link" to={`/jobs?search_query=${jobType}`}>{jobType}</Link></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4 mb-5">
                                        <div className="card-body">
                                            <h6 className="fw-bold">Posted Date: {formattedDate}</h6>
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
                                                    <img className='image rounded-circle' alt="Image" src={imageUrl} style={{width: "100px", height: "100px"}}/>
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
                                            <h5 className="fw-bold"><i className="bi bi-briefcase-fill"></i> Lowongan Serupa</h5>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                {jobsRoleByIds.map((lowongan) => (
                                                    <div key={lowongan.id} className='row'> 
                                                        <div className='col-3'>
                                                            <img className='image rounded-circle' alt="Image" src={lowongan.imageUrl} style={{width: "60px", height: "60px"}}/>
                                                        </div>
                                                        <div className="col">
                                                            <Link onClick={() => window.location.href = `/jobs/detail/${lowongan.uuid}`} className="fw-bold text-secondary link-detail">{lowongan.titleCompanny}</Link>
                                                            <p className="text-secondary">{lowongan.companyName}</p>
                                                        </div>
                                                    </div>
                                                ))}
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