import React, { useContext, useState } from "react";
import PricesInGrid from "./InGrid/PricesInGrid";
import PricesInRows from "./InRow/PricesInRows";
import PriceSelects from "./PriceSelects";
import FavPricesInRow from "./Favourites/InRow/FavPricesInRow";
import FavPricesInGrid from "./Favourites/InGrid/FavPricesInGrid";
import usePrices from "./usePrices";
import UserContext from "../../Context/User/UserContext";

export default function Prices(props) {

    const { getUsers, selectedUser } = useContext(UserContext);

    const { coins, added_tokens, favourites_tokens, getCois, getAdded_tokens, getFavourites_tokens, setCoins } = usePrices();

    const [display, setDisplay] = useState("Rows")
    const [sowTokens, setSowTokens] = useState("AllPrices")
    const [search, setSearch] = useState("");

    React.useEffect(() => {
        getCois();
        getAdded_tokens();
        getFavourites_tokens();
        getUsers()
    }, [])

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

    React.useEffect(() => {
        getAdded_tokens();
        getFavourites_tokens();
        setCoins([])
        getCois()
    }, [display, sowTokens, selectedUser])
    return (
        <>
            <div className="container pt-5 bg-dark my-5 p-5 rounded shadow-lg">

                <div className="row pb-3 pt-3">
                    <form className="d-flex">
                        <input className="form-control me-2" style={{ height: "40px" }} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-primary text-white" type="submit">Search</button>
                    </form>
                </div>
                <PriceSelects setDisplay={setDisplay} setSowTokens={setSowTokens} isPhone={props.isPhone} getCois={() => getCois} />

                {sowTokens == "AllPrices" ?

                    selectedUser ?
                        favourites_tokens ?
                            display == "Rows" ?
                                <PricesInRows coins={filteredCoins} favouriteTokens={favourites_tokens} />
                                :
                                <PricesInGrid coins={filteredCoins} favouriteTokens={favourites_tokens} />
                            :
                            <></>
                        :
                        display == "Rows" ?
                            <PricesInRows coins={filteredCoins} favouriteTokens="0" />
                            :
                            <PricesInGrid coins={filteredCoins} favouriteTokens="0" />
                    :
                    selectedUser ?
                        display == "Rows" ?
                            <FavPricesInRow coins={filteredCoins} fovouriteTokens={favourites_tokens} addedTokens={added_tokens} />
                            :
                            <FavPricesInGrid coins={filteredCoins} fovouriteTokens={favourites_tokens} addedTokens={added_tokens} />
                        :
                        window.location.href = '/notUser'
                }
            </div>
        </>
    )
}