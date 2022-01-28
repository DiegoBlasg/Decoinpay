import axios from 'axios';
import { useState } from 'react';
import { useContext } from "react";
import UserContext from "../../../Context/User/UserContext";

const usePrices = () => {

    const { selectedUser } = useContext(UserContext);

    const [specificCoin, setSpecificCoin] = useState([]);
    const [coins, setCoins] = useState([]);
    const [token, setToken] = useState([]);
    const [added_tokens, setAdded_tokens] = useState([]);
    const [favourites_tokens, setFavourites_tokens] = useState(null);
    const [isFavourite, setIsFavourite] = useState();

    const getCois = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        setCoins(res.data)
    }

    const getAdded_tokens = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const res = await axios.get('/api/users/addedtoken', axiosConfig)
            setAdded_tokens(res.data)
        }
    }

    const getFavourites_tokens = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const res = await axios.get('/api/users/favouritetoken/', axiosConfig)
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

    const newAdded_token = async () => {
        if (selectedUser) {
            try {
                const res = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${specificCoin}`)
            } catch (error) {
                alert("No se ha encontrado ningun token con ese contrato")
                return;
            }
            try {
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const NewToken = {
                    token_contract: specificCoin
                }
                await axios.put('/api/users/addedtoken', NewToken, axiosConfig)
                window.location.href = '/'
            } catch (error) {
                if (error.response.status == 493) {
                    alert(error.response.data.mensaje)
                }
            }
        }
    }

    const deleteAdded_token = async (tokenid, tokenName) => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            let opcion = window.confirm(
                "¿Esta seguro que desea eliminar el siguiente token: " + tokenName + " ?"
            );
            if (opcion === true) {

                await axios.delete('/api/users/addedtoken/' + tokenid, axiosConfig)
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

    const deletetokenFavourite = async (tokenid) => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            await axios.delete('/api/users/favouritetoken/' + tokenid, axiosConfig)
            setIsFavourite(false)
        }
    }

    const addtokenFavourite = async (tokenid) => {
        if (selectedUser) {
            try {
                const axiosConfig = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const NewTokenFavourite = {
                    token_id: tokenid
                }
                await axios.put('/api/users/favouritetoken', NewTokenFavourite, axiosConfig)
                setIsFavourite(true)
            } catch (error) {
                alert(error.response.data.mensaje)
                window.location.reload()
            }
        } else {
            alert("Conecta metamask")
        }
    }
    return {
        coins, added_tokens, favourites_tokens, specificCoin, token, isFavourite,
        getCois, getAdded_tokens, getFavourites_tokens, getOneCoin, getOneToken, deleteAdded_token, newAdded_token, deletetokenFavourite, addtokenFavourite,
        setCoins, setIsFavourite, setSpecificCoin,
        formatDollar
    }
}
export default usePrices