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
import Profile from './component/profile/Profile.jsx'
import AddItemTable from './table/AddItemTable.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import { State } from './component/State.jsx'
import Form from './component/form/form.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import RegisterAndLogin from './auth/RegisterAndLogin.jsx'
// import LoginForm from './component/login/Login.jsx'
import Account from './component/account/Account.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <RequireAuth>
      <Root />    
    </RequireAuth>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Dashboard",
        element: <Dashboard />
      },
      {
        path: "Form",
        element: <Profile />
      },
      {
        path: "addItemTable",
        element: <AddItemTable />
      },
      {
        path: "Table",
        element: <TableCp />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'state2',
        element: <Form />
      }
    ]
  },
  {
    path: '/login',
    element: <RegisterAndLogin/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>

  </React.StrictMode>,
)

let AuthContext = React.createContext(null)

export const useAuth = () => {
  return React.useContext(AuthContext)
}

import { fakeAuthProvider } from './auth/auth.js'


function AuthProvider({children}) {
//   let [user, setUser] = React.useState(null)
//   let signin = (newUser, callback) => {
//     return fakeAuthProvider.signin(() => {
//       if(newUser._tokenResponse){
//         setUser(newUser.user.email);
//         localStorage.setItem('token', newUser._tokenResponse);
//         localStorage.setItem('user', newUser.user.email);
//       }else{
//         setUser(newUser.email);
//         localStorage.setItem('token',newUser.token);
//         localStorage.setItem('user', newUser.email);
//       }
//       callback;
//     })
//   }
//   let callbackUrl= (callback) => {
//     callback;
// }
  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      localStorage.clear();
      callback("/");
    })
  }
  let callbackUrl= (callback) => {
    callback;
}
  let signin = (data, callback) => {
    return fakeAuthProvider.signin(() => {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username',data.username);
      callback("/", { replace: true });
    })
  }
  // let value = {user, signin, signout, callbackUrl, setUser}
  let value = {signin, signout, callbackUrl}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}