import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar'

const EditProfile = () => {
    const [username, setUsername] = useState("")
    const [nohp, setNohp] = useState("")
    const [status, setStatus] = useState("")
    const [instagramUrl, setInstagramUrl] = useState("")
    const [facebookUrl, setFacebookUrl] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getEditUserById();
    }, []);

    const EditUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`,{
                username,
                nohp,
                status,
                instagramUrl,
                facebookUrl
            });
            navigate(`/profile`)
        } catch (error) {
            console.log(error);
        }
    }

    const getEditUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`)
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
                        aria-label="Default select example"
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        >
                        <option disabled selected hidden>Your Status</option>
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
                <div className="field">
                    <button type="submit" className="btn btn-dark">Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProfile