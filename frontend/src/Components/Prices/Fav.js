import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../Context/User/UserContext";

export default function Fav(props) {
    const [isFavourite, setIsFavourite] = useState();
    const { selectedUser } = useContext(UserContext);

    const isTokenFavourite = () => {
        if (props.tokens) {
            for (let i = 0; i < props.tokens.length; i++) {
                if (props.tokens[i] == props.id) {
                    setIsFavourite(true)
                    break;
                } else {
                    setIsFavourite(false)
                }
            }
            return isFavourite
        } else {
            setIsFavourite(true)
        }
    }

    const deletetokenFavourite = async (tokenid) => {
        await axios.delete('http://localhost:4000/users/' + selectedUser._id + "/" + tokenid)
        setIsFavourite(false)
    }

    const addtokenFavourite = async (tokenid) => {
        try {
            const NewTokenFavourite = {
                token_id: tokenid
            }
            await axios.put('http://localhost:4000/users/' + selectedUser._id, NewTokenFavourite)
            setIsFavourite(true)
        } catch (error) {
            alert("Inicia Sesion")
        }
    }

    React.useEffect(() => {
        isTokenFavourite();
    }, [])
    React.useEffect(() => {
        isTokenFavourite();
    }, [selectedUser])
    return (
        <>
            {
                isFavourite ?
                    <i className="bi bi-star-fill text-warning " onClick={() => deletetokenFavourite(props.id)} />
                    :
                    <i className="bi bi-star text-white " onClick={() => addtokenFavourite(props.id)} />
            }
        </>
    )
}