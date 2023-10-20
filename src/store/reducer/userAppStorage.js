import { LOG_ADMIN_IN, LOGIN_ADMIN, FETCH_USERS, FETCH_USER, UPDATE_USER, DELETE_USER,UPDATE_ADMIN } from "../action/userAppStorage";


const initialState = {
    adminToken: "",
    //expiresIn: "",
    admin: null,
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
    },
    usersList: []
}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_ADMIN_IN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }

        case LOGIN_ADMIN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }


        case FETCH_USERS:
            return {
                ...state,
                usersList: action.payload
            }

        case FETCH_USER:
            return {
                ...state,
                usersList: action.payload
            }

        case UPDATE_USER:
            if (true) {
                let updatedUser = action.payload

                let newUserList = []
                for (let data of state.usersList) {
                    if (data._id.toString() === updatedUser._id.toString()) {
                        newUserList.push(updatedUser)
                    } else {
                        newUserList.push(data)
                    }
                }

                return {
                    ...state,
                    usersList: newUserList
                }



            }

        case DELETE_USER:
            if (true) {
                let userId = action.payload
                let newUser = state.usersList.filter(data => data._id !== userId)
                return {
                    ...state,
                    usersList: newUser
                }
            }

        case UPDATE_ADMIN:
            if (true) {
                let updatedAdmin = action.payload
                return {
                    ...state,
                    admin:updatedAdmin
                }
            }

        default:
            return state
    }
}




