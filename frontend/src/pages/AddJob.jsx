import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormAddJobs from '../components/FormAddJobs'
import { getMe } from '../features/authSlice'

const AddJob = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError, user} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getMe())   
    }, [dispatch])

    useEffect(() => {
        if(isError){
            navigate("/")
        }
        if(user && user.role !== "Admin"){
          navigate("/")
        }
    }, [isError, user, navigate])
  return (
    <FormAddJobs/>
  )
}

export default AddJob