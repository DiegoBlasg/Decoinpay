import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import { ethers } from 'ethers';
import useUsers from './Hooks/useUsers'
import UserContext from '../Context/User/UserContext';

export default function Header(props) {
    const { CreateOrGetUserByWallet, loginState, setLoginState } = useUsers();
    const { encryptText } = useContext(UserContext);

    const ConnectWallet = async () => {
        setLoginState("londing...")
        if (!window.ethereum) {
            alert("Instale metamask")
            setLoginState("Conect")
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner();
        const walletAdress = encryptText(await signer.getAddress())
        CreateOrGetUserByWallet(walletAdress)
    }

    async function getMetamask() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const walletAdress = encryptText(await signer.getAddress());
            CreateOrGetUserByWallet(walletAdress);
        } catch (error) {
            console.log("no se puede conectar con metamask");
        }
    }

    React.useEffect(() => {
        getMetamask()
    }, [])

    if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
            window.location.reload();
        })
    }


    return (
        props.isPhone ?
            <header className="navbar navbar-light bg-dark">
                <div className="container py-2">
                    <img src="/img/logoblanco3.png" className="mx-2" alt="" height="50" />

                    <button type="button" className="btn btn-primary text-white fs-5 mx-3" onClick={() => ConnectWallet()}>{loginState}</button>

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
                    <button type="button" className="btn btn-primary text-white fs-5" onClick={() => ConnectWallet()}>{loginState}</button>

                </div>
            </header>

    )
}