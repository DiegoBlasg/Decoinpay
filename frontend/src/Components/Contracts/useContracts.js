import axios from 'axios';
import { useState } from 'react';

const useContract = (url_id, url_idau) => {
    const [contracts, setContracts] = useState({ contract: [] });
    const [transactions, setTransactions] = useState({ transaction: [] });
    const [allowed_users, setAllowed_users] = useState({ allowed_user: [] });
    const [name, setName] = useState([]);
    const [wallet_id, setWallet_id] = useState([]);

    const getContracts = async () => {
        const res = await axios.get('http://localhost:4000/contracts')
        setContracts({ contract: res.data })
    }

    const getOneContract = async () => {
        const res = await axios.get('http://localhost:4000/contracts/' + url_id)
        setContracts({ contract: res.data })
        setTransactions({ transaction: res.data.transactions })
        setAllowed_users({ allowed_user: res.data.allowed_users })
        setName(res.data.name)
    }

    const createContract = async () => {
        const newContract = {
            contract_id: "0x000000000000000000000000000",
            wallet_id: "0x000000000000000000000000000",
            name: name
        }
        await axios.post('http://localhost:4000/contracts', newContract)
    }


    const updateContract = async () => {
        const updateContract = {
            name: name,
        }
        await axios.put('http://localhost:4000/contracts/' + url_id, updateContract)
    }

    const deleteContract = async (id) => {
        const res = await axios.get('http://localhost:4000/contracts/' + id)
        let opcion = window.confirm(
            "¿Esta seguro que desea eliminar el siguiente contrato: " + res.data.name + " con el id " + res.data.wallet_id + " ?"
        );
        if (opcion === true) {
            await axios.delete('http://localhost:4000/contracts/' + id)
        }
        getContracts();
    }

    //deleteAllowed_user is here because it need a function from here
    const deleteAllowed_user = async (id, wallet, alias) => {
        const res = await axios.get('http://localhost:4000/contracts/' + url_id)
        let opcion = window.confirm(
            "¿Esta seguro que desea eliminar el siguiente usuario de la lista: " + alias + " con la cartera " + wallet + " ?"
        );
        if (opcion === true) {
            await axios.delete('http://localhost:4000/contracts/alloweduser/' + url_id + "/" + id)
        }
        getOneContract();
    }

    return {
        setName, setWallet_id, setName,
        contracts, transactions, allowed_users, name, wallet_id,
        getContracts, getOneContract, createContract, deleteContract, updateContract, deleteAllowed_user
    }
}
export default useContract