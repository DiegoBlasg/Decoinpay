import { Redirect, Route } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../Context/User/UserContext";

export default function PrivateRoute(props) {
    const { selectedUser } = useContext(UserContext);
    if (!selectedUser) return <Redirect to="/notUser" />
    return (
        <Route path={props.path}>
            {props.children}
        </Route>
    )
}