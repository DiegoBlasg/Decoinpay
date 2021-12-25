import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        props.isPhone ?
            <header className="navbar navbar-light bg-dark">
                <div className="container py-2">
                    <img src="/img/logoblanco3.png" className="mx-2" alt="" height="50" />
                    <button type="button" className="btn btn-primary text-white fs-5 mx-2"> 0x8b9....89c7</button>
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
            </header>

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

                    <button type="button" className="btn btn-primary text-white fs-5"> 0x8b9....89c7</button>
                </div>
            </header>

    )
}