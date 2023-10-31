import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteWithdraw, fetchWithdraws } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";

export const AdminWithdrawsComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [withdrawList, setWithdrawList] = useState([])
    let [filteredWithdraws, setfilteredWithdraws] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)

    let interval




    useEffect(() => {
        fetchAllWithdraws()
    }, [])




    let fetchAllWithdraws = async () => {
        setIsError(false)
        let res = await dispatch(fetchWithdraws())



        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setWithdrawList(res.message)
        setfilteredWithdraws(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/withdraw/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteWithdraw(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = withdrawList.filter(data => data._id !== id)

        setWithdrawList(filteredArray)
        setfilteredWithdraws(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredWithdraws.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setWithdrawList(newData)
            setIsLoading(false)
        } else {
            setWithdrawList(filteredWithdraws)
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
            

            <div className={styles.filter}>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by email' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>


            </div>

            <div className={styles.tableContainer} >

                {withdrawList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No withdraw found</p>

                </div>}
               


                {withdrawList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Withdrawer Name
                            </td>
                            <td>
                                WithdrawID
                            </td>
                            <td>
                                Amount

                            </td>
                            <td>
                                Bitcoin address

                            </td>
                            <td>
                                Zelle

                            </td>
                            <td>
                                Etherium

                            </td>
                            <td>
                                Cash App

                            </td>

                            <td>
                                Method

                            </td>
                         

                            <td>
                                Swift

                            </td>

                            <td>
                                Bank Name

                            </td>

                            <td>
                                Account Number

                            </td>

                            <td>
                                Account Name

                            </td>

                            <td>
                                Gcash Phone

                            </td>

                            <td>
                                Gcash Number

                            </td>
                            

                            <td>
                                Delete
                            </td>

                            <td>
                                Edit
                            </td>

                        </tr>



                        {withdrawList.map(data => <tr key={data.__id} >
                            <td >
                                {data.user.email}
                            </td>

                            <td >
                                {data.withdrawId}
                            </td>

                            <td>
                                {data.amount}
                            </td>

                            <td>
                                {data.bitcoin_address}
                
                            </td>


                            <td>
                                {data.zelle_address}
                            </td>

                            <td>
                                {data.etherium_address}
                            </td>

                            <td>
                                {data.cashapp_address}
    
                            </td>

                            <td>
                                {data.method}
                            </td>
                         
               

                            <td>
                                {data.swift}
                            </td>

                            <td>
                                {data.bank_name}
                            </td>

                            <td>
                                {data.account_number}
                            </td>

                            <td>
                                {data.account_name}
                            </td>

                            <td>
                                {data.phone}
                            </td>

                            <td>
                                {data.name}
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
