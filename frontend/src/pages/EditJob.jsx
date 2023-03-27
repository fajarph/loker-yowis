import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormEditJobs from '../components/FormEditJobs'
import { getMe } from '../features/authSlice'

const EditJob = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getMe())   
    }, [dispatch])

    useEffect(() => {
        if(isError){
            navigate("/")
        }
    }, [isError, navigate])
  return (
    <FormEditJobs/>
  )
}

export default EditJob