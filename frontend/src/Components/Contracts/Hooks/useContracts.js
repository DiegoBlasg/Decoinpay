import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../../Context/User//UserContext'

const useContract = (url_id) => {
    const { selectedUser, encryptText } = useContext(UserContext);
    const [contracts, setContracts] = useState([]);
    const [oneContractInArray, setOneContractInArray] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [allowed_users, setAllowed_users] = useState([]);
    const [name, setName] = useState([]);
    const [wallet_id, setWallet_id] = useState([]);
    const [isOwner, setIsOwner] = useState(false);


    const getContracts = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const res = await axios.get('http://localhost:4000/contracts', axiosConfig)
            setContracts(res.data)
        }
    }
    const getOneContractInfo = async () => {
        try {
            if (selectedUser) {
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const res = await axios.get('http://localhost:4000/contracts/contractinfo/' + url_id, axiosConfig)
                if (res.data.wallet_id) {
                    setIsOwner(true)
                }
                setOneContractInArray([res.data])
                setContracts(res.data)
                setTransactions(res.data.transactions)
                setName(res.data.name)
            }
        } catch (error) {
            alert("No se ha encontrado nada en esta ruta o no tienes permisios para entrar")
            window.location.href = '/contracts'
        }
    }
    const getOneContract = async () => {
        try {
            if (selectedUser) {
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const res = await axios.get('http://localhost:4000/contracts/' + url_id, axiosConfig)
                setOneContractInArray([res.data])
                setContracts(res.data)
                setTransactions(res.data.transactions)
                setAllowed_users(res.data.allowed_users)
                setName(res.data.name)
            }
        } catch (error) {
            alert("No se ha encontrado nada en esta ruta o no tienes permisios para entrar")
            window.location.href = '/contracts'
        }

    }

    const createContract = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const newContract = {
                name: name
            }
            await axios.post('http://localhost:4000/contracts', newContract, axiosConfig)
        }
    }


    const updateContract = async () => {
        try {
            if (selectedUser) {
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const updateContract = {
                    name: name,
                }
                await axios.put('http://localhost:4000/contracts/' + url_id, updateContract, axiosConfig)
                //window.location.reload()
            }
        } catch (error) {
            alert("No puedes modificar este contrato")
            window.location.href = '/contracts'
        }
    }

    const deleteContract = async (id) => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const contract = await axios.get('http://localhost:4000/contracts/' + id, axiosConfig)
            for (let i = 0; i < contract.data.allowed_users.length; i++) {
                await axios.delete('http://localhost:4000/users/contratwithaccess/' + id, { headers: { "wallet": encryptText(contract.data.allowed_users[i].wallet_id) } })
            }
            await axios.delete('http://localhost:4000/contracts/' + id, axiosConfig)
            getContracts()
        }
    }

    //deleteAllowed_user is here because it need a function from here
    const deleteAllowed_user = async (id, wallet) => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            await axios.delete('http://localhost:4000/contracts/alloweduser/' + url_id + "/" + id, axiosConfig)
            await axios.delete('http://localhost:4000/users/contratwithaccess/' + url_id, { headers: { "wallet": encryptText(wallet.toLowerCase()) } })
        }
    }

    return {
        setName, setWallet_id, setName,
        contracts, transactions, allowed_users, name, wallet_id, oneContractInArray, isOwner,
        getContracts, getOneContract, createContract, deleteContract, updateContract, deleteAllowed_user, getOneContractInfo
    }
}
export default useContract