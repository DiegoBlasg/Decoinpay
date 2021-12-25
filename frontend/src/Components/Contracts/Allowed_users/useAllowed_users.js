import axios from 'axios';
import { useState } from 'react';

const useAllowed_users = (url_id, url_idau) => {
    const [alias, setAlias] = useState("");
    const [wallet, setWallet] = useState("");
    const [wallet_id, setWallet_id] = useState([]);


    async function getAllowed_users() {
        const res = await axios.get('http://localhost:4000/contracts/alloweduser/' + url_id + "/" + url_idau)
        setAlias(res.data.alias)
        setWallet_id(res.data.wallet_id)
    }

    const createAllowe_user = async () => {
        const newAllowed_user = {
            alias: alias,
            wallet_id: wallet
        }
        await axios.put('http://localhost:4000/contracts/alloweduser/' + url_id, newAllowed_user)
    }

    const updateAllowed_user = async () => {
        const newAllowed_user = {
            alias: alias,
            wallet_id: wallet_id
        }
        await axios.post('http://localhost:4000/contracts/alloweduser/' + url_id + "/" + url_idau, newAllowed_user)
    }

    //deleteAllowed_user is in ../useContracts.js because it need a function from there

    return {
        setWallet_id, setAlias, setWallet,
        alias, wallet, wallet_id,
        getAllowed_users, updateAllowed_user, createAllowe_user
    }
}
export default useAllowed_users