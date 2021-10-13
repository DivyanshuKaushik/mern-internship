import React,{useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login() {

    const history = useHistory()
    
    const [credentials,setCredentials] = useState({
        email:"",password:""
    })

    const handleInput = (e) => {
        let name=e.target.name
        let value = e.target.value 
        setCredentials({...credentials,[name]:value})
    }
    
    const loginUser = async(e)=>{
        e.preventDefault()
        const res = await fetch("/api/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
        })
        const data = await res.json()
        
        alert(JSON.stringify(data))
        console.log(data)
        if(res.status===200){
            history.push('/adminpanel')
        }

    } 

    return (
        <>         
        <h3 className=""> <center>Hello!!</center>  </h3>
        <div className="container col-lg-10 mx-auto shadow rounded p-4 row">
        <div className="relative col-lg-5 mx-auto">
            <img className="w-100 h-100" src="/images/signin.png" alt="login" />
        </div>
        <form className="col-lg-4 my-auto mx-auto" onSubmit={e=>e.preventDefault()}>
           <div className="mb-3">
                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-12">
                    <input type="email" className="form-control" id="inputEmail" onChange={handleInput} value={credentials.email} name="email" />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-12">
                    <input type="password" className="form-control" id="inputPassword" onChange={handleInput} value={credentials.password} name="password"/>
                </div>
            </div>
            <button type="submit" className="btn btn-danger" onClick={loginUser}>Log In</button>
        </form>
        </div>
        </>
    )
}

export default Login
