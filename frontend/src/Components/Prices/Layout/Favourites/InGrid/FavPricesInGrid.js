import { useContext } from "react";
import UserContext from "../../../../../Context/User/UserContext";
import AddedTokenGrid from "./AddedTokenGrid";
import FavouriteTokenGrid from "./FavouriteTokenGrid";

export default function FavPricesInGrid(props) {
    const { selectedUser } = useContext(UserContext);
    return (

        <div className="row mt-4">
            {
                selectedUser ?
                    <div className="card-group">
                        {
                            props.addedTokens.map(addedTokens => (
                                <AddedTokenGrid search={props.search} addedTokens={addedTokens} key={addedTokens} />
                            ))
                        }
                        {
                            props.fovouriteTokens.map(fovouriteToken => (
                                <FavouriteTokenGrid search={props.search} fovouriteTokens={fovouriteToken} key={fovouriteToken} />
                            ))
                        }
                    </div>
                    :
                    <div className="card-group"></div>
            }

        </div >
    )
}