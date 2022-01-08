import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios'
import { GET_PROFILE } from "../types";
import CryptoJs from "crypto-js"

const UserState = (props) => {
    const initialState = {
        users: [],
        selectedUser: null
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getProfile = async (wallet) => {
        const res = await axios.get("http://localhost:4000/users/", { headers: { "wallet": wallet } })
        const yeyeye = {
            ...res.data,
            wallet_id: wallet
        }
        dispatch({ type: GET_PROFILE, payload: yeyeye });
    }

    const SignOff = async () => {
        dispatch({ type: GET_PROFILE, payload: null });
    }
    const encryptText = (text) => {
        const textoCifrado = CryptoJs.AES.encrypt(text, process.env.REACT_APP_PASSWORD.toString()).toString()
        return textoCifrado
    }
    const decryptText = (text) => {
        const bytes = CryptoJs.AES.decrypt(text, process.env.REACT_APP_PASSWORD.toString())
        const textoDescifrado = bytes.toString(CryptoJs.enc.Utf8)
        return textoDescifrado.toLowerCase()
    }
    return (
        <UserContext.Provider value={{
            users: state.users,
            selectedUser: state.selectedUser,
            getProfile,
            SignOff,
            encryptText,
            decryptText
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;