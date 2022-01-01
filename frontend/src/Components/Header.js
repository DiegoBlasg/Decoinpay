import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import UserContext from '../Context/User/UserContext';
import axios from 'axios';

export default function Header(props) {
    const { getUsers, getProfile, users, selectedUser, SignOff } = useContext(UserContext);

    //dev only
    const createUser = async () => {
        const newUser = {
            wallet_id: "0x0000",
            business_user: false
        }
        await axios.post('http://localhost:4000/users', newUser)
        getUsers()
    }
    const SignOffAndDeleteKey = () => {
        localStorage.removeItem('user')
        SignOff()
    }

    React.useEffect(() => {
        getUsers()
    }, [])
    return (
        props.isPhone ?
            <header className="navbar navbar-light bg-dark">
                <div className="container py-2">
                    <img src="/img/logoblanco3.png" className="mx-2" alt="" height="50" />
                    <button type="button" className="btn btn-primary text-white fs-5 mx-2">
                        {
                            users.length != 0 ?
                                <select className="form-select bg-primary border-0" onChange={(e) => getProfile(e.target.value)}>
                                    {
                                        !selectedUser ?
                                            <>
                                                <option value="0"></option>
                                                {
                                                    users.map(user => (
                                                        <option value={user._id} key={user._id}>{user.wallet_id}</option>
                                                    ))
                                                }
                                            </>
                                            :
                                            users.map(user => (
                                                <option value={user._id} key={user._id}>{user.wallet_id}</option>
                                            ))
                                    }
                                </select>
                                :
                                <span onClick={() => createUser()}>crear usuario</span>
                        }
                    </button>
                    <i className="bi bi-box-arrow-right text-white fs-3" onClick={() => SignOffAndDeleteKey()}></i>
                    <ul className="nav mt-2 fs-5 d-flex justify-content-center mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/contracts">Contratos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/">Precios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/account">Cuenta</Link>
                        </li>
                    </ul>
                </div>
            </header >

            :

            <header className="navbar navbar-light bg-dark">
                <div className="container py-2 testimonial-groupyh" >
                    <img src="/img/logoblanco3.png" alt="" height="50" />
                    <ul className="nav fs-5">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/contracts">Contratos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-4 text-light" to="/">Precios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/account">Cuenta</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center w-25">
                        <div className="col-8">
                            <button type="button" className="btn btn-primary text-white fs-5">
                                {
                                    users.length != 0 ?
                                        <select className="form-select bg-primary border-0" onChange={(e) => getProfile(e.target.value)}>
                                            {
                                                !selectedUser ?
                                                    <>
                                                        <option value="0"></option>
                                                        {
                                                            users.map(user => (
                                                                <option value={user._id} key={user._id}>{user.wallet_id}</option>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    users.map(user => (
                                                        <option value={user._id} key={user._id}>{user.wallet_id}</option>
                                                    ))
                                            }
                                        </select>
                                        :
                                        <span onClick={() => createUser()}>crear usuario</span>
                                }
                            </button>
                        </div>
                        <div className="col-4">
                            <i className="bi bi-box-arrow-right text-white fs-3" onClick={() => SignOffAndDeleteKey()}></i>
                        </div>
                    </div>


                </div>
            </header>

    )
}