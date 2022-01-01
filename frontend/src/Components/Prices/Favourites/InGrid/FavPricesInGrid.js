import AddedTokenGrid from "./AddedTokenGrid";
import FavouriteTokenGrid from "./FavouriteTokenGrid";

export default function FavPricesInGrid(props) {
    return (

        <div className="row mt-4">
            <div className="card-group">
                {
                    props.addedTokens.map(addedTokens => (
                        <AddedTokenGrid addedTokens={addedTokens} key={addedTokens} />
                    ))
                }
                {
                    props.fovouriteTokens.map(fovouriteToken => (
                        <FavouriteTokenGrid fovouriteTokens={fovouriteToken} key={fovouriteToken} />
                    ))
                }
            </div>
        </div >
    )
}