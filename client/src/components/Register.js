import React, { useState } from "react";

function Register() {

    const [user,setUser] = useState({
        username:"",phone:"",email:"",address:""
    })

    const handleInput = (e) => {
        // console.log(e.target.name,e.target.value)
        let name=e.target.name
        let value = e.target.value 
        setUser({...user,[name]:value})
    }
    const addData = async(e)=>{
        e.preventDefault()

        const data = await fetch("/api/adddata",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        const resp = await data.json()
        console.log(resp)
        alert(JSON.stringify(resp))
    }
  return (
    <div className="container mx-auto p-4">
      <form
        className="col-lg-4 my-auto mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-3">
          <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              onChange={handleInput}
              value={user.username}
              name="username"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={handleInput}
              value={user.email}
              name="email"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-12">
            <input
              type="phone"
              className="form-control"
              id="inputphone"
              onChange={handleInput}
              value={user.phone}
              name="phone"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              value={user.address}
              name="address"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-danger" onClick={addData}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
