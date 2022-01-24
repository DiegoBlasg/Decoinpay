import { useContext } from 'react';
import UserContext from '../../../../../Context/User/UserContext';
import AddedTokenRow from './AddedTokenRow';
import FavouriteTokenRow from './FavouriteTokenRow';

export default function FavPricesInRow(props) {
    const { selectedUser } = useContext(UserContext);
    return (
        <div className="row mt-3 table-responsive">
            <table className="table table-responsive table-dark table-striped">
                <thead className="thead-dark">
                    <tr style={{ height: "55px" }}>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">ath</th>
                        <th scope="col">24h%</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Circulating Supply</th>
                    </tr>
                </thead>
                {
                    selectedUser ?
                        <tbody>
                            {
                                props.addedTokens.map(addedTokens => (
                                    <AddedTokenRow search={props.search} addedTokens={addedTokens} key={addedTokens} />
                                ))
                            }
                            {
                                props.fovouriteTokens.map(fovouriteToken => (
                                    <FavouriteTokenRow fovouriteTokens={fovouriteToken} search={props.search} key={fovouriteToken} />
                                ))
                            }
                        </tbody>
                        :
                        <tbody></tbody>
                }

            </table>
        </div>
    )
}