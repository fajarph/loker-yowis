import React, {useState, useRef} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from './Navbar'

const AddJobs = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [salary, setSalary] = useState("");
    const [jobRole, steJobRole] = useState("");
    const [jobLevel, setJobLevel] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobShortDescription, setJobShortDescription] = useState("");
    const [jobLongDescription, setJobLongDescription] = useState("");
    const [education, setEducation] = useState("");
    const [industry, setIndustry] = useState("");
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const navigate = useNavigate(); 
    const editorRef = useRef(null);

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const SaveJobs = async (e) => {
        e.preventDefault();
        try {
            let jobLongDescription = ""
            if (editorRef.current) {
                jobLongDescription = editorRef.current.getContent()
            }

            const formData = new FormData()
            formData.append("companyName", companyName)
            formData.append("companyAddress", companyAddress)
            formData.append("salary", salary)
            formData.append("jobRole", jobRole)
            formData.append("jobLevel", jobLevel)
            formData.append("jobType", jobType)
            formData.append("jobShortDescription", jobShortDescription)
            formData.append("jobLongDescription", jobLongDescription)
            formData.append("education", education)
            formData.append("industry", industry)
            formData.append("file", file)
            
            await axios.post(`http://localhost:5000/jobs`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                jobLongDescription
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
                    <label className="form-label">Salary</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder='Salary'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Role</label>
                    <select
                        className="form-select" 
                        value={jobRole} 
                        onChange={(e) => steJobRole(e.target.value)}
                        placeholder='Job Role'
                    >
                        <option selected hidden>Job Role</option>
                        <option value="Manager">Manager</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Human Resources Specialist">Human Resources Specialist</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Programmer">Programmer</option>
                        <option value="Designer">Designer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Writer">Writer</option>
                        <option value="Penerjemah">Penerjemah</option>
                        <option value="Customer Service ">Customer Service </option>
                        <option value="Trainer">Trainer</option>
                        <option value="Supervisor">Supervisor</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Level</label>
                    <select
                        className="form-select" 
                        value={jobLevel} 
                        onChange={(e) => setJobLevel(e.target.value)}
                        placeholder='Job Level'
                    >
                        <option selected hidden>Job Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Medium">Medium</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Type</label>
                    <select
                        className="form-select"
                        value={jobType} 
                        onChange={(e) => setJobType(e.target.value)}
                        placeholder='Job Type'
                    >
                        <option selected hidden>Job Type</option>
                        <option value="General Manager">General Manager</option>
                        <option value="Akunting">Akunting</option>
                        <option value="Analis">Analis</option>
                        <option value="Jurnalis">Jurnalis</option>
                        <option value="Karyawan Restoran">Karyawan Restoran</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Programmer">Programmer</option>
                        <option value="Arsitek">Arsitek</option>
                        <option value="Guru">Guru</option>
                        <option value="Programmer">Programmer</option>
                        <option value="Penulis">Penulis</option>
                        <option value="Penerjemah">Penerjemah</option>
                        <option value="Insinyur">Insinyur</option>
                        <option value="Psikolog">Psikolog</option>
                        <option value="Fotografer">Fotografer</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Short Description</label>
                    <textarea 
                        type="text" 
                        className="form-control"
                        value={jobShortDescription} 
                        onChange={(e) => setJobShortDescription(e.target.value)}
                        placeholder='Job Short Description'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Long Description</label>
                    <Editor
                        onInit={(_, editor) => editorRef.current = editor}
                        initialValue=""
                        init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
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
                <div className='field'>
                    <label className='label '>Image</label>
                    <div className='control'>
                        <div className='input-group mb-3 mt-2'>
                            <label className="file-label">
                                <input 
                                    type="file" 
                                    className='form-control' 
                                    onChange={loadImage}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {preview ? (
                    <figure className="image rounded">
                        <img className='image rounded-circle' src={preview} alt="Preview Image" style={{width: "125px", height: "125px"}}/>
                    </figure>
                ): ( 
                    ""
                )}

                <div className="field">
                    <button type="submit" className="btn btn-dark">Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddJobs