import React, {useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosInstance from '../utils/AxiosInstance'

const Profile = () => {
  const jwt=localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt == null && !user){
      navigate('/login')
    }else{
      getSomeData()
    }
  }, [jwt, user])

  const getSomeData = async ()=>{
    const res = await AxiosInstance.get('auth/profile/')
    console.log(res.data)
  }
  const refresh = JSON.parse(localStorage.getItem('refresh'))

  const handleLogout = async ()=>{
    const res = await AxiosInstance.post('auth/logout/', {'refresh': refresh})
    if (res.status === 204){
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('user')
      navigate('/login')
      toast.warn("logout successful")
    }
  }

  return (
    <div className='container'>
      <h2>hi {user && user.full_name}</h2>
      <p style={{textAlign:'center', }}>Welcome to your profile</p>
      <button onClick={handleLogout} className='logout-btn'>Logout</button>
    </div>
  )
}

export default Profile