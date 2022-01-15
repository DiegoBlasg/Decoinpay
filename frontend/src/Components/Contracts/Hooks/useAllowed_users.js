import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../../Context/User/UserContext';

const useAllowed_users = (url_id, url_idau) => {
    const { selectedUser } = useContext(UserContext);
    const [alias, setAlias] = useState("");
    const [wallet, setWallet] = useState("");
    const [wallet_id, setWallet_id] = useState([]);


    const getOneAllowed_user = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const res = await axios.get('http://localhost:4000/contracts/alloweduser/' + url_id + "/" + url_idau, axiosConfig)
            setAlias(res.data.alias)
            setWallet_id(res.data.wallet_id)
        }
    }

    const createAllowed_user = async () => {
        if (selectedUser) {
            try {
                const walletInLowerCase = wallet.toLowerCase();
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const newAllowed_user = {
                    alias: alias,
                    wallet_id: walletInLowerCase
                }
                await axios.put('http://localhost:4000/contracts/alloweduser/' + url_id, newAllowed_user, axiosConfig)
                window.location.reload()
            } catch (error) {
                alert(error.response.data.mensaje)
            }
        }
    }

    const updateAllowed_user = async () => {
        if (selectedUser) {
            try {
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const newAllowed_user = {
                    alias: alias
                }
                await axios.post('http://localhost:4000/contracts/alloweduser/' + url_id + "/" + url_idau, newAllowed_user, axiosConfig)
            } catch (error) {
                alert(error.response.data.mensaje)
            }
        }
    }

    //deleteAllowed_user is in ../useContracts.js because it need a function from there

    return {
        setWallet_id, setAlias, setWallet,
        alias, wallet, wallet_id,
        getOneAllowed_user, updateAllowed_user, createAllowed_user
    }
}
export default useAllowed_users