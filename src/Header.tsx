import "./Header.scss";
import {AppLink} from "./AppLink";
import {useContext} from "react";
import {Session, SessionContext} from "./SessionContext";

export interface HeaderProps {
    style?: React.CSSProperties;
    contentWidth: string;
    logout: () => void
}

export function Header(props: HeaderProps) {
    const session: Session = useContext(SessionContext);
    return (<header className="Header" style={props.style}>
        <nav style={{flexBasis: props.contentWidth}}
             className="Header__nav">
            <ul className="Header__navList">
                <li className="Header__navListElement">
                    <AppLink color="white" to="/">Home</AppLink>
                    {session.user?.username}
                </li>
                {session.user ?
                    <li className="Header__navListElement">
                        <AppLink color="white" onClick={props.logout}>Logout</AppLink>
                    </li>
                    :
                    <li className="Header__navListElement">
                        <AppLink color="white" to="/login">Login</AppLink>
                    </li>
                }
            </ul>
        </nav>
    </header>)
}
