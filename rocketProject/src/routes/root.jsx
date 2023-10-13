import { ControlOutlined, CiCircleOutlined, CompassOutlined, DatabaseOutlined  } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
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
              <button type="submit" style={{width:"100px"}}>New</button>
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
                <Link to={`/state`}><DatabaseOutlined />State</Link>
              </li>
              <li>
                <Link to={`/logout`}><DatabaseOutlined />Log out</Link>
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