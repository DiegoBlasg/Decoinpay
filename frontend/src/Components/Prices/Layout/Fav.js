import React from "react";
import { useContext } from "react";
import UserContext from "../../../Context/User/UserContext";
import usePrices from "../Hooks/usePrices";

export default function Fav(props) {
    const { deletetokenFavourite, addtokenFavourite, setIsFavourite, isFavourite } = usePrices();
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