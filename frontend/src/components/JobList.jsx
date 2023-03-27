import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const JobList = () => {
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setlimit] = useState(5)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [companyAddress, setCompanyAddress] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {isError, user} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        getJobs()
        dispatch(getMe())
    }, [page, keyword])

    useEffect(() => {
        if(isError){
            navigate("/")
        }   
    }, [isError, navigate]);

    const getJobs = async () => {
        const response = await axios.get(`http://localhost:5000/jobs?search_query=${keyword}&page=${page}&limit=${limit}`)
        setJobs(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
    }

    const deleteJob = async (id) => {
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
        setPage(0)
        setKeyword(query)
    }

  return (
    <>
        <Navbar/>
        <div className='container mt-5 mb-5'>
            <form onSubmit={searchData}>
                <div className='d-flex justify-content-center row'>
                    <div className="col-11">
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='input-group'>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <select 
                                        className='form-select' 
                                        value={companyAddress} 
                                        onChange={(e) => setCompanyAddress(e.target.value)}
                                    >
                                        <option selected hidden>Semua Lokasi</option>
                                        <option value="Bekasi">Bekasi</option>
                                        <option value="Business Analyst">Business Analyst</option>
                                        <option value="Chef">Chef</option>
                                        <option value="Content Creator">Content Creator</option>
                                        <option value="Customer Service Representative">Customer Service Representative</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Financial Analyst">Financial Analyst</option>
                                        <option value="Graphic Designer">Graphic Designer</option>
                                        <option value="Human Resources Specialist">Human Resources Specialist</option>
                                        <option value="Marketing Coordinator">Marketing Coordinator</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Operations Manager">Operations Manager</option>
                                        <option value="Programmer">Programmer</option>
                                        <option value="Psikolog">Psikolog</option>
                                        <option value="Project Manager">Project Manager</option>
                                        <option value="Software Developer">Software Developer</option>
                                        <option value="Supply Chain Manager">Supply Chain Manager</option>
                                        <option value="Sales Executive">Sales Executive</option>
                                        <option value="Teacher">Teacher</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-1'>
                        <button type="submit" className="btn btn-dark row">Search</button>
                    </div>
                </div>
            </form>

            <div className='mt-5 container'>
                <h2>Cari Lowongan kerja</h2>
                <div className='row mt-4'>
                    <div className='col-3'>
                        <h5>VACANCY</h5>
                    </div>
                    <div className='col-4'>
                        <h5>DETAIL</h5>
                    </div>
                    <div className='col-5'>    
                        <h5>DESKRIPSI PEKERJAAN</h5>
                    </div>
                </div>
                {jobs.map((job, index) => (
                    <div key={job.id} className='row border border-1'>
                        <div className='col-3 mt-3'>
                            <div className='row'> 
                                <div className='col-3 mt-2'>
                                <img className='image rounded-circle' alt="Image" src={job.url} style={{width: "64px", height: "64px"}} />
                                </div>
                                <div className='col mt-2'>
                                    <h5>{job.jobRole}</h5>
                                </div>
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
                                        <td>{job.education}</td>
                                    </tr>
                                    <tr className='col-5'>
                                        <td className='h5'>Lokasi</td>
                                        <td>{job.companyAddress}</td>
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

                                    {user && user.role === "User" && (
                                        <button type="button" className="btn btn-dark me-1"><i class="bi bi-star"></i> SIMPAN</button>
                                    )}
                                    
                                    {user && user.role === "Admin" && (
                                        <button onClick={()=> deleteJob(job.uuid)} type="button" className="btn btn-dark">Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className='mt-2'>
                Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>
            <p className='d-flex justify-content-center text-danger'>{msg}</p>
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
        </div>
    </>
  )
}

export default JobList