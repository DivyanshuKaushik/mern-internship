import React, { useState ,useEffect} from "react";

function ShowData() {
    const [users,setUsers]= useState([])
    useEffect(()=>{
        fetch('/api/data').then(res=>res.json()).then(data=>setUsers(data))
        .catch(e=>console.log(e))
    },[users])
    // console.log(users)

    // delete user
    const deleteUser=async(id)=>{
        const res = await fetch(`/api/deletedata/${id}`,{
            method:"DELETE",
        })
        const resp = await res.json()
        // console.log(resp)
        alert(JSON.stringify(resp))
    }
  return (
    <div>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {users && users.map(({_id,username,email,phone,address},i)=>{
            return(
            <tr key={_id}>
                <th scope="row">{i+1}</th>
                <td>{username}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td><button type="button" className="btn btn-danger" onClick={()=>deleteUser(_id)}>Delete</button></td>
            </tr>

            )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;

