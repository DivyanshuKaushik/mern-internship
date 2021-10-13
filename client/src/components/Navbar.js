import React, { useState ,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
function Navbar() {
    const history = useHistory()
    const logout = async()=>{
        const res = await fetch(`/api/logout`,{
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const resp = await res.json()
        // console.log(resp)
        alert(JSON.stringify(resp))
        if(res.status===200){
            history.push('/')
        }
    }

    const [user, setUser] = useState("")
    const showAdminPanel = async () => {
        try {
            const res = await fetch('/api/getuser', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json()
            setUser(data)
            if (!res.status === 200) {
                throw new Error(res.error)
            }

        } catch (e) {
            console.log(e)
            history.push('/')
        }
    }
    // console.log(user)
    useEffect(() => {
        showAdminPanel();
        // eslint-disable-next-line
    }, [])
  return (
    <header>
      <nav className="navbar navbar-expand-lg  navbar-light bg-light">
        <div className="mx-auto col-lg-6">
          <span className="navbar-brand mb-0 h1 fs-3 text-danger">
            MERN Stack
          </span>
        </div>
        {user.name && (
          <div
            className="col-lg-6 collapse navbar-collapse"
          >
            <h4 className="mx-5 mt-2">{user.name}</h4>
            <ul className="navbar-nav mx-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/adminpanel"
                >
                  AdminPanel
                </Link>
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
