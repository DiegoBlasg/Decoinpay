import axios from 'axios';
import { useState } from 'react';
import { useContext } from "react";
import UserContext from "../../Context/User/UserContext";

const usePrices = () => {

    const { selectedUser } = useContext(UserContext);

    const [specificCoin, setSpecificCoin] = useState([]);
    const [coins, setCoins] = useState([]);
    const [token, setToken] = useState([]);
    const [added_tokens, setAdded_tokens] = useState([]);
    const [favourites_tokens, setFavourites_tokens] = useState(null);

    const getCois = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        setCoins(res.data)
    }

    const getAdded_tokens = async () => {
        if (selectedUser) {
            const res = await axios.get('http://localhost:4000/users/addedtokens/' + selectedUser._id)
            setAdded_tokens(res.data)
        }
    }

    const getFavourites_tokens = async () => {
        if (selectedUser) {
            const res = await axios.get('http://localhost:4000/users/favouritestokens/' + selectedUser._id)
            setFavourites_tokens(res.data)
        }
    }

    const getOneCoin = async (coinID) => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinID}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        setSpecificCoin(res.data)
    }

    const getOneToken = async (tokencontract) => {
        const res = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${tokencontract}`)
        setToken([res.data.data])
    }

    const deleteAdded_token = async (tokenid, tokenName) => {
        if (selectedUser) {

            let opcion = window.confirm(
                "¿Esta seguro que desea eliminar el siguiente token: " + tokenName + " ?"
            );
            if (opcion === true) {
                await axios.delete('http://localhost:4000/users/othertoken/' + selectedUser._id + "/" + tokenid)
                window.location.href = '/'
            }
        }
    }

    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits
            })
            .format(number);

    return {
        coins, added_tokens, favourites_tokens, specificCoin, token,
        getCois, getAdded_tokens, getFavourites_tokens, getOneCoin, getOneToken, deleteAdded_token,
        setCoins,
        formatDollar
    }
}
export default usePrices