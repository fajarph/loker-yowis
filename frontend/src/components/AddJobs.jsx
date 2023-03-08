import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar'

const AddJobs = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [salery, setSalery] = useState("");
    const [jobRole, steJobRole] = useState("");
    const [jobLevel, setJobLevel] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [education, setEducation] = useState("");
    const [industry, setIndustry] = useState("");
    const navigate = useNavigate();

    const SaveJobs = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/jobs`,{
                companyName,
                companyAddress,
                salery,
                jobRole,
                jobLevel,
                jobType,
                jobDescription,
                education,
                industry
            });
            navigate(`/jobs`)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <Navbar/>
        <div>
        <form onSubmit={SaveJobs} className='container justify-content-center mt-5 mb-5'>
                <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input 
                        type="Username" 
                        className="form-control" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder='Company Name'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Address</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={companyAddress} 
                        onChange={(e) => setCompanyAddress(e.target.value)}
                        placeholder='Company Address'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salery</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={salery} 
                        onChange={(e) => setSalery(e.target.value)}
                        placeholder='Salery'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Role</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={jobRole} 
                        onChange={(e) => steJobRole(e.target.value)}
                        placeholder='Job Role'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Level</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={jobLevel} 
                        onChange={(e) => setJobLevel(e.target.value)}
                        placeholder='Job Level'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Type</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={jobType} 
                        onChange={(e) => setJobType(e.target.value)}
                        placeholder='Job Type'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Description</label>
                    <textarea 
                        type="text" 
                        className="form-control"
                        value={jobDescription} 
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder='Job Description'
                        rows="4"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Education</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={education} 
                        onChange={(e) => setEducation(e.target.value)}
                        placeholder='Education'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Industry</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={industry} 
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder='Industry'
                    />
                </div>
                <div className="field">
                    <button type="submit" className="btn btn-dark">Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddJobs