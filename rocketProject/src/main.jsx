import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './routes/root.jsx'
import './index.css'
import ErrorPage from '../errorPage.jsx'
import Dashboard from './component/Dashboard.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from './component/login/Login.jsx'
import TableCp from './table/Table.jsx'
import FormCP from './component/form/form.jsx'
import Profile from './component/profile/Profile.jsx'
import AddItemTable from './table/AddItemTable.jsx'
import Logout from './component/logout/logout.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import { State } from './component/State.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:"Dashboard",
        element: <Dashboard />
      },
      {
        path:"Form",
        element: <Profile />
      },
      {
        path:"addItemTable",
        element:<AddItemTable />
      },
      {
        path:"Table",
        element: <TableCp />
      },
      {
        path:"logout",
        element: <Logout/>
      },
      {
        path:'state',
        element: <State/>
      }
    ]    
  },
  {
    path:'/login',
    element:<LoginForm/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
