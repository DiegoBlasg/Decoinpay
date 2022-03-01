import { Link } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { ethers } from 'ethers';
import useUsers from './Hooks/useUsers'
import UserContext from '../Context/User/UserContext';

export default function Header(props) {
    const { CreateOrGetUserByWallet, loginState, setLoginState } = useUsers();
    const { encryptText } = useContext(UserContext);
    const [responsiveMenu, setResponsiveMenu] = useState(false);

    const ConnectWallet = async () => {
        setLoginState("londing...")
        if (!window.ethereum) {
            alert("Instale metamask")
            setLoginState("Connect")
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner();
        const walletAdress = encryptText(await signer.getAddress())
        CreateOrGetUserByWallet(walletAdress)
    }

    const getMetamask = async () => {
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
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
    }

    return (
        props.isPhone ?
            <>
                <header className="navbar navbar-light bg-dark">
                    <div className="container py-2">
                        <img src="/img/logoblanco3.png" className="mx-2" alt="" height="50" />

                        <div className='d-flex align-items-center'>
                            <button type="button" className="btn btn-primary text-white fs-5 mx-3" onClick={() => ConnectWallet()}>{loginState}</button>
                            <i className="bi bi-list text-white" style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => setResponsiveMenu(!responsiveMenu)} />
                        </div>
                    </div>
                </header>
                {
                    responsiveMenu ?
                        <div className='bg-dark py-3'>
                            <h2 className='text-center my-2'><Link className="nav-link text-light" to="/contracts" onClick={() => setResponsiveMenu(false)}>Contratos</Link></h2>
                            <h2 className='text-center my-2'><Link className="nav-link text-light" to="/" onClick={() => setResponsiveMenu(false)}>Precios</Link></h2>
                            <h2 className='text-center my-2'><Link className="nav-link text-light" to="/account" onClick={() => setResponsiveMenu(false)}>Cuenta</Link></h2>
                            <h2 className='text-center my-2'><Link className="nav-link text-light" to="/informationapi" onClick={() => setResponsiveMenu(false)}>API</Link></h2>
                        </div>
                        :
                        <></>
                }
            </>


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
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/informationapi">API</Link>
                        </li>
                    </ul>
                    <button type="button" className="btn btn-primary text-white fs-5" onClick={() => ConnectWallet()}>{loginState}</button>

                </div>
            </header>

    )
}