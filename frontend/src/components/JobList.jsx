import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from "../features/authSlice"
import { Link } from 'react-router-dom'
import "./style/jobList.css"

const JobList = () => {
    const [jobs, setJobs] = useState([])
    const [userJobIds, setUserJobIds] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setlimit] = useState(5)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [query, setQuery] = useState("")
    const [locations, setLocation] = useState([])
    const [LocationId, setLocationId] = useState("")
    const [roles, setRole] = useState([])
    const [RoleId, setRoleId] = useState("")
    const [educations, setEducation] = useState([])
    const [EducationId, setEducationId] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {isError, user} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        getEducations()
        getRoles()
        getLocations()
        getUserJobIds()
    }, [])

    useEffect(() => {
        getJobs()
        dispatch(getMe())
    }, [page])

    useEffect(() => {
        if(isError){
            navigate("/")
        }   
    }, [user, isError, navigate]);

    const getJobs = async () => {
        const response = await axios.get(`http://localhost:5000/jobs?search_query=${query}&LocationId=${LocationId}&RoleId=${RoleId}&EducationId=${EducationId}&page=${page}&limit=${limit}`)
        setJobs(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
    }

    const getUserJobIds = async () => {
        if (user) {
            const response = await axios.get(`http://localhost:5000/userjobs?user_id=${user.id}`)
            setUserJobIds(response.data)
        }
    }

    const saveUserJobids = async(e, jobId) => {
        e.preventDefault()
        e.target.disabled = true

        try {
            await axios.post('http://localhost:5000/userjobs', {
                UserId: user.id,
                JobId: jobId
            })
            getUserJobIds()
            e.target.disabled = false
        } catch (error) {
            console.log(error);
        }
    }

    const deleteSavedUserJobids = async(e, jobId) => {
        e.preventDefault()
        console.log(user.id);
        console.log(jobId);
        await axios.post(`http://localhost:5000/deleteuserjobs`, {
            UserId: user.id,
            JobId: jobId
        })
        getUserJobIds()
    }

    const getLocations = async () => {
        const response = await axios.get("http://localhost:5000/locations")
        setLocation(response.data);
    }

    const getRoles = async () => {
        const response = await axios.get("http://localhost:5000/roles")
        setRole(response.data);
    }

    const getEducations = async () => {
        const response = await axios.get("http://localhost:5000/educations")
        setEducation(response.data);
    }

    const deleteJob = async (e, id) => {
        e.preventDefault()
        await axios.delete(`http://localhost:5000/jobs/${id}`)
        getJobs()
    }

    const changePage =({selected}) => {
        setPage(selected)
        if(selected === 9){
            setMsg("Jika tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci yang lebih spesifik!")
        }else{
            setMsg("")
        }
    }

    const searchData = (e) => {
        e.preventDefault()
        getJobs()
    }

  return (
    <>
        <Navbar/>
        <div className='container mt-5 mb-5'>
            <form onSubmit={searchData}>
                <div className="input-group d-flex justify-content-center">
                    <div className="form-outline col-10 input-group-lg">
                        <input 
                            type="text" 
                            className="form-control"
                            value={query}
                            placeholder="Cari nama perusahaan, jenis kontrak, dan jenis industri..."
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <div className='input-group d-flex justify-content-evenly'>
                    <div className='form-outline col-3 input-group-lg'>
                        <select 
                            className='form-select select-1' 
                            value={LocationId} 
                            onChange={(e) => setLocationId(e.target.value)}
                        >
                            <option className='option bg-dark text-white' value={""}>Semua Location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-outline col-3 input-group-lg'>
                        <select 
                            className='form-select select-2' 
                            value={RoleId} 
                            onChange={(e) => setRoleId(e.target.value)}
                        >
                            <option className='option bg-dark text-white' value={""}>Semua Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-outline col-3 input-group-lg'>
                        <select 
                        className="form-select select-3"
                        value={EducationId} 
                        onChange={(e) => setEducationId(e.target.value)}
                        >
                            <option className='option bg-dark text-white' value={""}>Semua Pendidikan</option>
                            {educations.map((education) => (
                                <option key={education.id} value={education.id}>{education.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <div className='mt-5 container'>
                <h2>Cari Lowongan kerja</h2>
                <div className='mt-4'>
                    <div className='row border border-dark bg-dark'>
                        <div className='col-3 mt-3 mb-3 text-white'>
                            <h5>VACANCY</h5>
                        </div>
                        <div className='col-4 mt-3 mb-3 text-white'>
                            <h5>DETAIL</h5>
                        </div>
                        <div className='col-5 mt-3 mb-3 text-white'>    
                            <h5>DESKRIPSI PEKERJAAN</h5>
                        </div>
                    </div>
                </div>
                {jobs.map((job) => (
                    <div key={job.id} className='row border border-1'>
                        <div className='col-3 mt-3'>
                            <div className='row'> 
                                <div className='col-3 mt-2'>
                                <img className='image rounded-circle' alt="Image" src={job.url} style={{width: "64px", height: "64px"}} />
                                </div>
                                <Link to={`/jobs/detail/${job.uuid}`} className='custom-link col mt-2'>
                                    <h5>{job.titleCompanny}</h5>
                                </Link>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='row'> 
                                <table className='ms-3 mt-3'>
                                    <tbody>
                                    <tr className='col-5'>
                                        <td className='h5'>Perusahaan</td>
                                        <td>{job.companyName}</td>
                                    </tr>
                                    <tr className='col-5'>
                                        <td className='h5'>Pendidikan</td>
                                        <td>{job.Education.name}</td>
                                    </tr>
                                    <tr className='col-5'>
                                        <td className='h5'>Lokasi</td>
                                        <td>{job.Location.name}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className=''> 
                                <p className='mt-3'>
                                    {job.jobShortDescription}
                                </p>
                                <div className='d-flex justify-content-end mb-4'>

                                    <Link to={`/jobs/detail/${job.uuid}`} className="btn btn-dark me-1">
                                        SELENGKAPNYA
                                    </Link>

                                    {!isLoggedIn && (
                                        <div>
                                            <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                                <div class="modal-dialog modal-dialog-centered">
                                                    <div class="modal-content">
                                                    <div class="modal-body">
                                                        <div className="text-center text-dark mt-4 fw-bold">
                                                            <h3>Simpan dengan akun Loker.Yowis</h3>
                                                        </div>
                                                        <div className="text-center mt-4">
                                                            <p>Login dan simpan pekerjaan ini dan peluang lain seperti ini dengan akun Loker.Yowis gratis.</p>
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            
                                                            <button to={'/register'} type="submit" class="btn btn-dark btn-lg" data-bs-dismiss="modal">CLOSE</button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button data-bs-target="#exampleModalToggle" data-bs-toggle="modal" className="btn btn-dark me-1"><i className="bi bi-star"></i> SIMPAN</button>
                                        </div>
                                    )}

                                    {user && user.role === "User" && (
                                        <button 
                                            onClick={(e) => { 
                                                if (userJobIds.includes(job.id)) {
                                                    deleteSavedUserJobids(e, job.id);
                                                } else {
                                                    saveUserJobids(e, job.id);
                                                }
                                            }} 
                                            type="button" 
                                            className="btn btn-dark me-1"
                                        >
                                            <i className={`bi ${userJobIds.includes(job.id) ? 'bi-star-fill' : 'bi-star'}`}></i>
                                            {userJobIds.includes(job.id) ? " TERSIMPAN" : " SIMPAN"}
                                        </button>
                                    )}
                                    
                                    {user && user.role === "Admin" && (
                                        <button onClick={(e)=> deleteJob(e, job.uuid)} type="button" className="btn btn-dark">Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className='mt-2' style={{ 
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
                marginTop: '2rem'
            }}>
                Menampilkan {rows ? page + 1 : 0} sampai {pages} Dari {rows} Lowongan
            </p>
            <nav 
                className="pagination justify-content-center"
                key={rows}
                role="navigation" 
                aria-label='Page navigation example'
            >
                <ReactPaginate 
                    containerClassName={'pagination'}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={Math.min(10, pages)}
                    onPageChange={changePage}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                />
            </nav>
            <p className='d-flex justify-content-center fw-bold text-dark'>{msg}</p>
        </div>
    </>
  )
}

export default JobList