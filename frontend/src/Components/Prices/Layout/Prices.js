import React, { useContext, useState } from "react";
import PricesInGrid from "./PricesInGrid";
import PricesInRows from "./PricesInRows";
import PriceSelects from "./PriceSelects";
import FavPricesInRow from "./Favourites/InRow/FavPricesInRow";
import FavPricesInGrid from "./Favourites/InGrid/FavPricesInGrid";
import usePrices from "../Hooks/usePrices";
import UserContext from "../../../Context/User/UserContext";

export default function Prices(props) {

    const { selectedUser } = useContext(UserContext);

    const { coins, added_tokens, favourites_tokens, getCois, getAdded_tokens, getFavourites_tokens, setCoins } = usePrices();

    const [display, setDisplay] = useState("Rows")
    const [sowTokens, setSowTokens] = useState("AllPrices")
    const [search, setSearch] = useState("");

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

    React.useEffect(() => {
        getCois();
        getAdded_tokens();
        getFavourites_tokens();
    }, [])

    React.useEffect(() => {
        getAdded_tokens();
        getFavourites_tokens();
        setCoins([])
        getCois()
    }, [display, sowTokens, selectedUser])
    return (
        <>
            <div className="container pt-4 bg-dark my-5 p-5 rounded shadow-lg">

                <div className="row pb-3">
                    <form className="d-flex">
                        <input className="form-control me-2" style={{ height: "40px" }} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                <PriceSelects setDisplay={setDisplay} setSowTokens={setSowTokens} isPhone={props.isPhone} getCois={() => getCois} />

                {sowTokens == "AllPrices" ?

                    selectedUser ?
                        favourites_tokens ?
                            display == "Rows" ?
                                <PricesInRows coins={filteredCoins} favouriteTokens={favourites_tokens} isPhone={props.isPhone} />
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
                    display == "Rows" ?
                        <FavPricesInRow coins={filteredCoins} search={search} fovouriteTokens={favourites_tokens} addedTokens={added_tokens} />
                        :
                        <FavPricesInGrid coins={filteredCoins} search={search} fovouriteTokens={favourites_tokens} addedTokens={added_tokens} />
                }
            </div>
        </>
    )
}