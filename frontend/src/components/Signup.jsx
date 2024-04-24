import React, { useEffect, useState} from 'react'
import axios from 'axios'
import AxiosInstance from '../utils/AxiosInstance'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate()
    const [searchparams] = useSearchParams()
    const [formdata, setFormData] = useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        password2:""
    })

    const [error, setError] = useState("")

    const handleOnChange = (e) =>{
        setFormData({...formdata, [e.target.name]:e.target.value})
    }

    const handleSignInWithGithub =  () =>{
        window.location.assign(`https://github.com/login/oauth/authorize/?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`)
    }

    
    const send_code_to_backend = async ()=>{
        if (searchparams){
            try{
                const code = searchparams.get('code')
                const response = await AxiosInstance.post("auth/github/", {"code":code})
                const result = response.data
                console.log(result)
                if (response.status === 200 ){
                    const user = {
                        "email":result.email,
                        "names":result.full_name
                    }

                localStorage.setItem('access', JSON.stringify(result.access_token))
                localStorage.setItem('refresh', JSON.stringify(result.refresh_token))
                localStorage.setItem('user', JSON.stringify(user))

                navigate("/profile")
                toast.success("login successful")
                }
            }catch (error){
                console.log(error)
            }
        }
    }

    let code = searchparams.get('code')
    useEffect(() => {
        if (code){
            send_code_to_backend()
        }

        return () => {
            second
        }
    }, [code])

    const handleSigninWithGoogle = async (response)=>{
        const payload = response.credential
        const server_res = await axios.post("http://localhost:8000/api/v1/auth/google/", {'access_token':payload})
        console.log(server_res.data)
        const user={
            "email":server_res.data.email,
            "names":server_res.data.full_name
        }
        if (server_res.status === 200){
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem('access', JSON.stringify(server_res.data.access_token))
            localStorage.setItem('refresh', JSON.stringify(server_res.data.refresh_token))
            navigate("/profile")
            toast.success("login successful")
        }
    }

    useEffect(() => {
        /** global google */
        const google = window.google
        google.accounts.id.initialize({
            client_id:import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleSigninWithGoogle
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme:"outline", size:"large", text:"continue_with", shape:"circle", width:"280"}
        );
    }, [])
        
    const {email, first_name, last_name, password, password2} = formdata

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/api/v1/auth/register/', formdata)
        console.log(response.data)
        const result=response.data
        if(response.status == 201){
            // redirect to verifyemail component
            navigate("/otp/verify")
            toast.success(result.message)
        }       
    }
  
  return (
    <div>
        <div className='form-container'>
            <div style={{width:"100%"}} className='wrapper'>
                <h2>Create Account</h2>
                
                <form action="" onSubmit={handleSubmit}>
                <p style={{color:"red", padding:"1px"}}>{ error ? error : ""}</p>
                    <div className='form-group'>
                        <label htmlFor="">Email Address:</label>
                        <input type="text" 
                        className='email-form' 
                        name='email' 
                        value={email} 
                        onChange={handleOnChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">First Name:</label>
                        <input type="text" 
                        className='email-form' 
                        name='first_name' 
                        value={first_name} 
                        onChange={handleOnChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Last Name:</label>
                        <input type="text" 
                        className='email-form' 
                        name='last_name' 
                        value={last_name}
                        onChange={handleOnChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Password:</label>
                        <input type="password" 
                        className='email-form' 
                        name='password' 
                        value={password} 
                        onChange={handleOnChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Confirm Password:</label>
                        <input type="password" 
                        className='email-form' 
                        name='password2' 
                        value={password2}
                        onChange={handleOnChange} />
                    </div>
                    <input type="submit" value="Submit" className='submitButton'/>
                </form>

                <h3 className='text-option'>Or</h3>
                <div className='githubContainer'>
                    <button onClick={handleSignInWithGithub}>Sign up with Github</button>
                </div>
                <div className='googleContainer'>
                    <div id="signInDiv" className="gsignIn"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup