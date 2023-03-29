import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from './Navbar'

const FormAddJobs = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [locations, setLocation] = useState([])
    const [LocationId, setLocationId] = useState("")
    const [salary, setSalary] = useState("");
    const [roles, setRole] = useState([])
    const [RoleId, setRoleId] = useState("")
    const [levels, setlevel] = useState([])
    const [LevelId, setLevelId] = useState("")
    const [educations, setEducation] = useState([])
    const [EducationId, setEducationId] = useState("")
    const [jobType, setJobType] = useState("");
    const [jobShortDescription, setJobShortDescription] = useState("");
    const [jobLongDescription, setJobLongDescription] = useState("");
    const [industry, setIndustry] = useState("");
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const navigate = useNavigate(); 
    const editorRef = useRef(null);

    useEffect(() => {
        getLocations()
        getRoles()
        getLevels()
        getEducations()
    }, [])

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
            formData.append("LocationId", LocationId)
            formData.append("salary", salary)
            formData.append("RoleId", RoleId)
            formData.append("LevelId", LevelId)
            formData.append("EducationId", EducationId)
            formData.append("jobType", jobType)
            formData.append("jobShortDescription", jobShortDescription)
            formData.append("jobLongDescription", jobLongDescription)
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

    const getLocations = async () => {
        const response = await axios.get("http://localhost:5000/locations")
        setLocation(response.data);
    }

    const getRoles = async () => {
        const response = await axios.get("http://localhost:5000/roles")
        setRole(response.data);
    }

    const getLevels = async () => {
        const response = await axios.get("http://localhost:5000/levels")
        setlevel(response.data);
    }

    const getEducations = async () => {
        const response = await axios.get("http://localhost:5000/educations")
        setEducation(response.data);
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
                <div className='field'>
                    <label className='label'>Location</label>
                    <div className="control mt-2">
                        <select 
                        className="form-select" 
                        value={LocationId} 
                        onChange={(e) => setLocationId(e.target.value)}
                        >
                            <option selected hidden>Select Location</option>
                            {locations.map((location) => (
                                <option value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Salary</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder='Salary'
                    />
                </div>
                <div className='field'>
                    <label className='label'>Job Role</label>
                    <div className="control mt-2">
                        <select 
                        className="form-select" 
                        value={RoleId} 
                        onChange={(e) => setRoleId(e.target.value)}
                        >
                            <option selected hidden>Select Job Role</option>
                            {roles.map((role) => (
                                <option value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Job Level</label>
                    <div className="control mt-2">
                        <select 
                        className="form-select" 
                        value={LevelId} 
                        onChange={(e) => setLevelId(e.target.value)}
                        >
                            <option selected hidden>Select Job Level</option>
                            {levels.map((level) => (
                                <option value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Education</label>
                    <div className="control mt-2">
                        <select 
                        className="form-select" 
                        value={EducationId} 
                        onChange={(e) => setEducationId(e.target.value)}
                        >
                            <option selected hidden>Select Education</option>
                            {educations.map((education) => (
                                <option value={education.id}>{education.name}</option>
                            ))}
                        </select>
                    </div>
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
                        <option value="Kontrak">Kontrak</option>
                        <option value="Purna Waktu / Full Time">Purna Waktu / Full Time</option>
                        <option value="Tetap">Tetap</option>
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

export default FormAddJobs