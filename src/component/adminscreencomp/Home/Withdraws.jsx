import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminWithrawEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, depositsList } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        console.log(isData)
        updateHandler(isData)

    }

    useEffect(() => {
        let dataObj = depositsList.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])





    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>Edit Client Deposit</h1>

                {depositsList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Depositor Email
                        </label>
                        <input  value={isData.user.email} type='text' readOnly />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            DepositID
                        </label>
                        <input  value={isData.depositId} type='text' readOnly/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Amount
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'amount')} value={isData.amount} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Type
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'type')} value={isData.type} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Date
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'date')} value={isData.date} type='date'/>
                    </div>
  


                    <div className={styles.inputCards}>
                        <label>
                            status
                        </label>
                        <select onChange={(e) => handleChangeHandler(e, 'status')}
                            value={isData.status}
                        >
                            <option>
                                active

                            </option>
                            <option >
                                Pending
                            </option>

                        </select>


                    </div>






                    <div className={styles.buttonContainer} >
                        <button >save</button>
                    </div>



                </form>}
            </div>






        </div></>)




}