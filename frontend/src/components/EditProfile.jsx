import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'

const EditProfile = () => {
    const [username, setUsername] = useState("")
    const [nohp, setNohp] = useState("")
    const [status, setStatus] = useState("")
    const [instagramUrl, setInstagramUrl] = useState("")
    const [facebookUrl, setFacebookUrl] = useState("")
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(getMe())
    }, []);

    useEffect(() => {
        if (user !== undefined) {
            getUserById();
        }
    }, [user]);

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const EditUser = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("username", username)
        formData.append("nohp", nohp)
        formData.append("status", status)
        formData.append("instagramUrl", instagramUrl)
        formData.append("facebookUrl", facebookUrl)
        formData.append("file", file)
        try {
            await axios.patch(`http://localhost:5000/users/${user.uuid}`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/profile`)
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${user.uuid}`)
        setUsername(response.data.username)
        setNohp(response.data.nohp)
        setStatus(response.data.status)
        setInstagramUrl(response.data.instagramUrl)
        setFacebookUrl(response.data.facebookUrl)
    }
  return (
    <div>
        <Navbar/>
        <div>
        <form onSubmit={EditUser} className='container justify-content-center mt-5'>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="Username" 
                        className="form-control" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">No Hp</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={nohp}
                        onChange={(e) => setNohp(e.target.value)}
                        placeholder='NoHp'
                    />
                </div>
                <div>
                    <label className="form-label">Status</label>
                    <select 
                        className="form-select"
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option selected hidden>Your Status</option>
                        <option value="Sudah Menikah">Sudah Menikah</option>
                        <option value="Belum Menikah">Belum Menikah</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Instagram</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        placeholder='Instagram'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Facebook</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        placeholder='Facebook'
                    />
                </div>
                <div className='field'>
                    <label className='label '>Image</label>
                    <div className='control'>
                        <div className='input-group mb-3'>
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
                    <figure className="img rounded">
                        <img src={preview} alt="Preview Image"/>
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

export default EditProfile