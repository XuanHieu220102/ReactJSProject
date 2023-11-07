import { ControlOutlined, CiCircleOutlined, CompassOutlined, DatabaseOutlined  } from '@ant-design/icons';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../main';
import './root.css';
export default function Root() {
    let authStore = useAuth();
    let navigate = useNavigate();
    const logoutPage = () => {
      authStore.signout(navigate);
    } 

    return (
      <>
        <div id="sidebar">
          <h1 className='logout' onClick={() => {logoutPage()}}>LOG OUT</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button id='btn-newItem' type="submit" style={{width:"100px"}}> <Link className='newAddItem' to={`/addItemTable`}>New</Link> </button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`/Dashboard`}><ControlOutlined />DashBoard</Link>
              </li>
              <li>
                <Link to={`/Form`}><CiCircleOutlined />User Profile</Link>
              </li>
              <li>
                <Link to={`/addItemTable`}><CompassOutlined />Form</Link>
              </li>
              <li>
                <Link to={`/Table`}><CompassOutlined />Table</Link>
              </li>
              <li>
                <Link to={`/account`}><DatabaseOutlined />Account</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet/>  
        </div>
      </>
    );
  }