import { ethers } from 'ethers';
import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../Context/User/UserContext'

const useUsers = () => {
    const { getProfile, selectedUser, encryptText, decryptText } = useContext(UserContext);
    const [loginState, setLoginState] = useState("Connect")
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState()

    const getBalance = async () => {
        if (selectedUser) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const balance = await provider.getBalance(decryptText(selectedUser.wallet_id))
            const balanceInEth = ethers.utils.formatEther(balance)
            setBalance(balanceInEth)
        }
    }

    const getUserTransactions = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/transactions`, axiosConfig)
            setTransactions(res.data)
        }
    }

    const CreateOrGetUserByWallet = async (walletAdress) => {
        const axiosConfig = {
            headers: {
                "admin": encryptText(process.env.REACT_APP_ADMIN_PASSWORD),
                "wallet": walletAdress
            }
        };
        const newUser = {
            wallet_id: walletAdress,
            business_user: false
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/users`, newUser, axiosConfig)
        getProfile(walletAdress);
        setLoginState(getShortID(decryptText(walletAdress).toLowerCase()))

    }

    const getShortID = (wallet) => {
        return wallet.substring(0, 5) + "..." + wallet.substring(wallet.length - 4, wallet.length)
    }
    return {
        CreateOrGetUserByWallet, loginState, setLoginState, getUserTransactions, transactions, getBalance, balance
    }
}
export default useUsers