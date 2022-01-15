import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../Context/User/UserContext'

const useUsers = () => {
    const { getProfile, selectedUser, encryptText, decryptText } = useContext(UserContext);
    const [loginState, setLoginState] = useState("Connect")
    const [transactions, setTransactions] = useState([])

    const getUserTransactions = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const res = await axios.get('http://localhost:4000/users/transactions', axiosConfig)
            setTransactions(res.data)
        }
    }

    const CreateOrGetUserByWallet = async (walletAdress) => {
        const axiosConfig = {
            headers: {
                "wallet": encryptText(process.env.REACT_APP_ADMIN_PASSWORD || "9876")
            }
        };
        const res = await axios.get('http://localhost:4000/users/admin', axiosConfig)
        let isUser = false;
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].wallet_id == decryptText(walletAdress)) {
                isUser = true
            }
        }
        if (!isUser) {
            const newUser = {
                wallet_id: walletAdress,
                business_user: false
            }
            await axios.post('http://localhost:4000/users', newUser, axiosConfig)
            getProfile(walletAdress);
            setLoginState(getShortID(decryptText(walletAdress).toLowerCase()))
        } else {
            const user = await axios.get('http://localhost:4000/users', { headers: { "wallet": walletAdress } })
            getProfile(encryptText(user.data.wallet_id));
            setLoginState(getShortID(user.data.wallet_id.toLowerCase()))
        }
    }

    const getShortID = (wallet) => {
        return wallet.substring(0, 5) + "..." + wallet.substring(wallet.length - 4, wallet.length)
    }
    return {
        CreateOrGetUserByWallet, loginState, setLoginState, getUserTransactions, transactions
    }
}
export default useUsers