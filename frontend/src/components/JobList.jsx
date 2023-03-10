import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import ReactPaginate from 'react-paginate'

const JobList = () => {
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setlimit] = useState(3)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")

    useEffect(() => {
        getJobs()
    }, [page, keyword])

    const getJobs = async () => {
        const response = await axios.get(`http://localhost:5000/jobs?search_query=${keyword}&page=${page}&limit=${limit}`)
        setJobs(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
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
                    <div className="col-9">
                        <input 
                            type="text" 
                            className="form-control"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
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
                        <div className='col-3'>
                            <div className='row'> 
                                <div className='col-3 mt-2'>
                                    <h5>Image</h5>
                                </div>
                                <div className='col mt-2'>
                                    <h5>{job.jobRole}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='row'> 
                                <table className='ms-3 mt-2'>
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
                                <p className='mt-2'>
                                    {job.jobDescription}
                                </p>
                                <div className='d-flex justify-content-end mb-4'>
                                    <button type="button" className="btn btn-dark me-1">SELENGKAPNYA</button>
                                    <button type="button" className="btn btn-dark">SIMPAN</button>
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
                    className='pagination'
                    pageCount={Math.min(10, pages)}
                    onPageChange={changePage}
                    pageLinkClassName={"page-link"}
                    previousLinkClassName={"Previous"}
                    nextLinkClassName={"Next"}
                    activeLinkClassName={"pagination-link is-current"}
                    disabledLinkClassName={"pagination-link is-disabled"}
                />
            </nav>
        </div>
    </>
  )
}

export default JobList