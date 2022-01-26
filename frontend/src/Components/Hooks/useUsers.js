import { ethers } from 'ethers';
import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../Context/User/UserContext'
import detectEthereumProvider from '@metamask/detect-provider';

const useUsers = () => {
    const { getProfile, selectedUser, encryptText, decryptText } = useContext(UserContext);
    const [loginState, setLoginState] = useState("Connect")
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState()

    const getBalance = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            getBalancehandleEthereum();
        } else {
            window.addEventListener('ethereum#initialized', getBalancehandleEthereum, {
                once: true,
            });
            setTimeout(getBalancehandleEthereum, 3000);
        }
    }

    function getBalancehandleEthereum() {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {

            getBalanceWithEthereum()
        } else {
            console.log('Please install MetaMask!');
        }
    }

    const getBalanceWithEthereum = async () => {
        const provider = await detectEthereumProvider();
        if (selectedUser) {
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
            const res = await axios.get('/api/users/transactions', axiosConfig)
            setTransactions(res.data)
        }
    }

    const CreateOrGetUserByWallet = async (walletAdress) => {
        const axiosConfig = {
            headers: {
                "admin": encryptText(process.env.REACT_APP_ADMIN_PASSWORD || "9876"),
                "wallet": walletAdress
            }
        };
        const newUser = {
            wallet_id: walletAdress,
            business_user: false
        }
        await axios.post('/api/users', newUser, axiosConfig)
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