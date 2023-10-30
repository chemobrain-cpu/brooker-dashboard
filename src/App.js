import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { checkIfAdminIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import FallBackComponent from './component/general/Fallback'
import { useSelector } from "react-redux";


{/*Admin dashbaoard section*/ }
const AdminLogin = React.lazy(() => import('./screen/admin_screen/Auth/Login'))

const AdminSignup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))

const AdminUsers = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminUsers'))
const AdminEditUser = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditUser'))



const AdminDeposits = React.lazy(() => import('./screen/admin_screen/Dashboard/AminDeposits'))
const AdminEditDeposit = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditDeposit'))


const AdminWithdraws = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminWithdraws'))
const AdminEditWithdraw = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditWithdraw'))


const AdminEditAdmin = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditAdmin'))


function App() {
  let dispatch = useDispatch()
  let { user, color, admin, userToken, adminToken } = useSelector(state => state.userAuth)

  useEffect(async () => {
    await dispatch(checkIfAdminIsLoggedIn())
    //await dispatch(getTheme())
  }, [])




  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<AdminLogin />} />

          <Route path='/adminlogin' element={<AdminLogin />} />
          {/* the Admin  DASHBOARD routes*/}

          <Route path='/adminsignup' element={<AdminSignup />} />

          <Route path='/admindashboard/users' element={adminToken ? <AdminUsers status={false} /> : <AdminLogin />} />

          <Route path='/admindashboard/users/:id' element={adminToken ? <AdminEditUser status={true} /> : <AdminLogin />} />






          <Route path='/admindashboard/deposits' element={adminToken ? <AdminDeposits status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/deposits/:id' element={adminToken ? <AdminEditDeposit status={true} /> : <AdminLogin />} />






          <Route path='/admindashboard/withdraws' element={adminToken ? <AdminWithdraws status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/withdraw/:id' element={adminToken ? <AdminEditWithdraw status={true} /> : <AdminLogin />} />




          <Route path='/admindashboard/trades' element={adminToken ? <AdminUsers status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/trades/:id' element={adminToken ? <AdminEditUser status={true} /> : <AdminLogin />} />









          <Route path='/admindashboard/admin' element={adminToken ? <AdminEditAdmin status={true} /> : <AdminLogin />} />


        </Routes>


      </Suspense>
    </div>

  );
}

export default App;
