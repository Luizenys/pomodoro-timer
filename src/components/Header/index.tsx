import { HeaderContainer } from "./styles";

import logoPomodoro from '../../assets/pomodoro.png';
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logoPomodoro} alt="Logo Tomate" width="40"/>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={35} />
                </NavLink>
                <NavLink to="/history" title="Historico">
                    <Scroll size={35} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}