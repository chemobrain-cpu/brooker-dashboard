import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteDeposit, fetchDeposits } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";

export const AdminDepositsComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [depositList, setDepositList] = useState([])
    let [filteredDeposits, setfilteredDeposits] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color, user } = useSelector(state => state.userAuth)

    let interval




    useEffect(() => {
        fetchAllDeposits()
    }, [])




    let fetchAllDeposits = async () => {
        setIsError(false)
        let res = await dispatch(fetchDeposits())



        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setDepositList(res.message)
        setfilteredDeposits(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/deposits/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteDeposit(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = depositList.filter(data => data._id !== id)

        setDepositList(filteredArray)
        setfilteredDeposits(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredDeposits.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();

                console.log(itemData)
                console.log(textData)
                return itemData.indexOf(textData) > -1;
            })

            setDepositList(newData)
            setIsLoading(false)
        } else {
            setDepositList(filteredDeposits)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>
            <h1>All Deposit</h1>

            <div className={styles.filter}>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>


            </div>

            <div className={styles.tableContainer} >

                {depositList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No Deposits found</p>

                </div>}


                {depositList.length !== 0 && <table>
                    <tbody>
                        <tr>
                        <td>
                                Depositor Name
                            </td>
                            <td>
                                DepositID
                            </td>
                            <td>
                                Amount

                            </td>

                            <td>
                                Type

                            </td>

                            <td>
                                Date

                            </td>

                            <td>
                                Status

                            </td>



                            <td>
                                Delete
                            </td>

                            <td>
                                Edit
                            </td>

                        </tr>



                        {depositList.map(data => <tr key={data.__id} >
                            <td >
                                {data.user.email}
                            </td>

                            <td >
                                {data.depositId}
                            </td>

                            <td>
                                {data.amount}
                            </td>

                            <td>
                                {data.type}
                            </td>


                            <td>
                                {data.date}
                            </td>

                            <td>
                                {data.status}
                            </td>

                          



                            <td onClick={() => deleteHandler(data._id)}>
                                <span className='material-icons'> delete</span>
                            </td>

                            <td onClick={() => editHandler(data._id)}>
                                <span className='material-icons'> edit</span>
                            </td>






                        </tr>)}


                    </tbody>
                </table>}




            </div>



        </div>



    </div>)




}
