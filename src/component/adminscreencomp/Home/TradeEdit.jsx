import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminTradeEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, tradesList } = useSelector(state => state.userAuth)

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
        updateHandler(isData)

    }

    useEffect(() => {
        let dataObj = tradesList.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])










    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>







                {tradesList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Trader Name
                        </label>
                        <input value={isData.user.email} type='text' readOnly />
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            TradeID
                        </label>
                        <input value={isData.tradeId} type='text' readOnly />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Date
                        </label>
                        
                        <input value={isData.date}  type='text' readOnly/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Pair
                        </label>
                        <input value={isData.pair} onChange={(e)=>handleChangeHandler(e,'pair')} type='text'/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Profit
                        </label>
                        <input value={isData.profit} onChange={(e)=>handleChangeHandler(e,'profit')} type='text'/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Loss
                        </label>
                        <input value={isData.loss} onChange={(e)=>handleChangeHandler(e,'loss')} type='text'/>
                    </div>

                    <div className={styles.buttonContainer} >
                        <button >save</button>
                    </div>



                </form>}
            </div>






        </div></>)




}