import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios'
import { GET_USERS, GET_PROFILE } from "../types";

const UserState = (props) => {
    const initialState = {
        users: [],
        selectedUser: JSON.parse(localStorage.getItem("user"))
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUsers = async () => {
        const res = await axios.get("http://localhost:4000/users/")

        dispatch({ type: GET_USERS, payload: res.data });
    }

    const getProfile = async (id) => {
        const res = await axios.get("http://localhost:4000/users/" + id)
        dispatch({ type: GET_PROFILE, payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data))
    }


    const SignOff = async () => {
        dispatch({ type: GET_PROFILE, payload: null });
    }

    return (
        <UserContext.Provider value={{
            users: state.users,
            selectedUser: state.selectedUser,
            getUsers,
            getProfile,
            SignOff
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;