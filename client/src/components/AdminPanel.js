import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Register from "./Register";
import ShowData from "./ShowData";
import React, { useState ,useEffect} from "react";
import { useHistory } from "react-router-dom";

function AdminPanel() {
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
    <div className="container-fluid my-4">
    {user.name && 
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        {/* <Row> */}
        <div className="col-lg-8 mx-auto">
          <Nav variant="pills" className="container col-lg-4 flex-row mx-auto">
            <Nav.Item>
              <Nav.Link eventKey="first">Register User</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Show All</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-lg-9 mx-auto">
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Register />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <ShowData />
            </Tab.Pane>
          </Tab.Content>

        </div>
        {/* </Row> */}
      </Tab.Container>
    }
    </div>
  );
}

export default AdminPanel;
