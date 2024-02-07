import React, { useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosInstance from '../utils/AxiosInstance'

const ForgetPassword = () => {
  const navigate = useNavigate()
  const { uid, token } = useParams()
  const [ newpassword, setNewPassword] = useState({
    password:"",
    confirm_password:"",
  })
  const {password, confirm_password}=newpassword

  const handleChange =(e) =>{
    setNewPassword({...newpassword, [e.target.name]:e.target.value})
  }

  const data = {
    "password":password,
    "confirm_password":confirm_password,
    "uidb64":uid,
    "token": token,
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if (data){
      const res = await AxiosInstance.patch('auth/set-new-password/', data)
      const response = res.data
      if (res.status === 200){
        navigate('/login')
        toast.success(response.message)
      }
      console.log(response)
    }
  }

  return (
    <div>
      <div className='form-container'>
        <div className='wrapper' style={{width:"100%"}}>
          <h2>Enter your new password</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="">New Password:</label>
              <input type="text" className='email-form' name='password' onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="">Confirm Password:</label>
              <input type="text" className='email-form' value={confirm_password} onChange={handleChange} />
            </div>
            <button type='submit'className='vbtn' >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword