import './App.css';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import React, { useState ,useEffect} from "react";
import {useHistory } from "react-router-dom";
function App() {

  const history = useHistory()

    const [user, setUser] = useState({})
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
    <>
      <Navbar/>
      <Switch>
      {user.name?
        <Route exact path="/adminpanel">
          <AdminPanel />
        </Route>
      :
        <Route exact path="/">
          <Login />
        </Route>
      }
      </Switch>
    </>
  );
}

export default App;
