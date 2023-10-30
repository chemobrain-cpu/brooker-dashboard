import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminUserEditComponent  = ({ updateHandler,}) => {
    let [isData,setIsData] = useState(null)
    let { color,usersList } = useSelector(state => state.userAuth)

    let {id} = useParams()


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
        let dataObj = usersList.find(data=>data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])







    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>Edit user account</h1>

                {usersList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Email
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'email')} value={isData.email} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Full Name
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'fullName')} value={isData.fullName} type='text'/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Client Phone Number
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'phoneNumber')} value={isData.phoneNumber} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Client Gender
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'gender')} value={isData.gender} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Client Country
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'country')} value={isData.country} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Currency
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'currency')} value={isData.currency} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Password
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'password')} value={isData.password} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Current Plan
                        </label>

                        <input onChange={(e)=>handleChangeHandler(e,'currentPlan')} value={isData.currentPlan} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Available Balance
                        </label>

                        <input onChange={(e)=>handleChangeHandler(e,'availableBalance')} value={isData.availableBalance} type='number'/>
                    </div>

            


                    <div className={styles.inputCards}>
                        <label>
                            Deposited
                        </label>

                        <input onChange={(e)=>handleChangeHandler(e,'deposited')} value={isData.deposited} type='number'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            status
                        </label>
                        <select onChange={(e)=>handleChangeHandler(e,'accountStatus')}
                        value={isData.accountStatus} 
                        >
                            <option>
                                active

                            </option>
                            <option default>
                                inactive
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