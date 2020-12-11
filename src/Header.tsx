import "./Header.scss";
import {HeaderLink} from "./HeaderLink";
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
            <ul className="Header__left-nav-list">
                <li className="Header__navListElement">
                    <HeaderLink to="/">Home</HeaderLink>
                </li>
            </ul>
            <ul className="Header__right-nav-list">
                {session.user ?
                    (<>
                            <li className="Header__navListElement">
                                <HeaderLink to="/profile">{session.user.username}</HeaderLink>
                            </li>
                            <li className="Header__navListElement">
                                <HeaderLink onClick={props.logout}>Logout</HeaderLink>
                            </li>
                        </>
                    )
                    :
                    <li className="Header__navListElement">
                        <HeaderLink to="/login">Login</HeaderLink>
                    </li>
                }
            </ul>
        </nav>
    </header>)
}
