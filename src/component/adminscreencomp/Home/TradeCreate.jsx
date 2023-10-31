import React, { useState } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminTradeCreateComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({
        email: '',
        date: '',
        pair: '',
        profit: '',
        loss: ''
    })
    let { color, usersList } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        console.log(val)
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        if(!isData.email){
            return
        }
        updateHandler(isData)

    }


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Choose who to trade for
                        </label>
                        <select onChange={(e) => handleChangeHandler(e, 'email')} onSelect={(e) => handleChangeHandler(e, 'email')}>
                            <option></option>
                            {usersList.map(data => <option>{data.email}</option>)}

                        </select>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Date
                        </label>

                        <input value={isData ? isData.date : ''} onChange={(e) => handleChangeHandler(e, 'date')} type='date' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Pair
                        </label>
                        <input value={isData ? isData.pair : ''} onChange={(e) => handleChangeHandler(e, 'pair')} type='text' />
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Profit
                        </label>
                        <input value={isData ? isData.profit : ''} onChange={(e) => handleChangeHandler(e, 'profit')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Loss
                        </label>
                        <input value={isData ? isData.loss : ''} onChange={(e) => handleChangeHandler(e, 'loss')} type='text' />
                    </div>

                    <div className={styles.buttonContainer} >
                        <button >save</button>
                    </div>



                </form>
            </div>






        </div></>)




}