import React, { useContext } from 'react';
import UserContext from '../../../../Context/User/UserContext';
import ContractsCreated from './ContractsCreated';
import ContractsWithAcces from './ContractsWithAcces';

export default function ContractsCards(props) {
    const { selectedUser } = useContext(UserContext);

    return (
        <div>
            <ContractsCreated search={props.search} isPhone={props.isPhone} />

            {
                selectedUser ?
                    selectedUser.contracts_with_acces.map(contract => (
                        <ContractsWithAcces search={props.search} contractid={contract} key={contract} isPhone={props.isPhone} />
                    ))
                    :
                    <></>
            }
        </div>


    )

}
