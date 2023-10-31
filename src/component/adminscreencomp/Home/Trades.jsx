import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteTrade, fetchTrades } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";



export const AdminTradesComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [tradeList, setTradeList] = useState([])
    let [filteredTrades, setfilteredTrades] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)



    useEffect(() => {
        fetchAllTrades()
    }, [])

    let fetchAllTrades = async () => {
        setIsError(false)
        let res = await dispatch(fetchTrades())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setTradeList(res.message)
        setfilteredTrades(res.message)
        setIsLoading(false)
    }

    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/traders/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteTrade(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = tradeList.filter(data => data._id !== id)

        setTradeList(filteredArray)
        setfilteredTrades(filteredArray)
        setIsLoading(false)

    }

    let navigateHandler = ()=>{
        navigate('/admindashboard/trade')


    }



    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredTrades.filter((item) => {
                const itemData = item.email ? item.email : '';
                const textData = e.target.value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setTradeList(newData)
            setIsLoading(false)
        } else {
            setTradeList(filteredTrades)
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

            {tradeList.length != 0 && <div className={styles.filter}>

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


            </div>}

            <div className={styles.tableContainer} >

                {tradeList.length === 0 && <div className={styles.emptyContainer}>
                    <p>zero trades made</p>
                    <button style={{color:'blue'}} onClick={navigateHandler}>trade for a client</button>
                </div>}





                {tradeList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Email Of Trader
                            </td>
                            <td>
                                TradeID
                            </td>
                            <td>
                                Date

                            </td>

                            <td>
                                Pair

                            </td>

                            <td>
                                Profit

                            </td>

                            <td>
                                Loss

                            </td>
                            <td >
                                delete
                            </td>

                            <td> edit
                            </td>






                        </tr>


                        {tradeList.map(data => <tr key={data.__id} >
                            <td >
                                {data.user.email}
                            </td>

                            <td >
                                {data.tradeId}
                            </td>

                            <td>
                                {data.date}
                            </td>

                            <td>
                                {data.pair}
                            </td>

                            <td>
                                {data.profit}
                            </td>

                            <td>
                                {data.loss}
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
