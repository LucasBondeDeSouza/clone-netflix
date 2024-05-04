import React from "react";
import './Header.css'
import logo from '../Assets/logo-netflix.png'
import perfil from '../Assets/foto-perfil.png'

export default ({black}) => {
    return (
        <header className={black ? 'black': ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="Logo Netflix"/>
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src={perfil} alt="Usuário" />
                </a>
            </div>
        </header>
    )
}