import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate} from 'react-router-dom';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';
import { AdminUserEditComponent } from '../../../component/adminscreencomp/Home/UsersEdit';
 

const AdminEditUser = ({ status }) => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()




    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let updateHandler = async (data) => {
        setIsLoading(true)
        let res = await dispatch(updateUser(data))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/users')




    }



    if (isError) {
        return <Error />
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Cases' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='Home' />
                <AdminUserEditComponent updateHandler={updateHandler} />
            </div>
        </div>
    </>
    )
}

export default AdminEditUser














