import "./Header.scss";
import {HeaderLink} from "./HeaderLink";
import {useContext} from "react";
import {Session, SessionContext} from "./SessionContext";
import {useTranslation} from "react-i18next";

export interface HeaderProps {
    style?: React.CSSProperties;
    contentWidth: string;
    logout: () => void
}

export function Header(props: HeaderProps) {
    const session: Session = useContext(SessionContext);
    const {t, i18n} = useTranslation();
    const setLanguage = (lang: string) => {
      window.localStorage.setItem('i18nextLng', lang);
        i18n.changeLanguage(lang);
    };

    return (<header className="Header" style={props.style}>
        <nav style={{flexBasis: props.contentWidth}}
             className="Header__nav">
            <ul className="Header__left-nav-list">
                <li className="Header__navListElement">
                    <HeaderLink to="/">Home</HeaderLink>
                </li>
                {session.user ?
                    <li className="Header__navListElement">
                        <HeaderLink to="/chat">Chat</HeaderLink>
                    </li>
                    : null
                }
            </ul>
            <ul className="Header__right-nav-list">
                {
                    i18n.language !== 'en-US' ?
                        <li className="Header__navListElement">
                            <HeaderLink onClick={() => setLanguage('en-US')}
                                        className="Header__flagLink">🇬🇧</HeaderLink>
                        </li> : null
                }
                {
                    i18n.language !== 'fr-FR' ?
                        <li className="Header__navListElement">
                            <HeaderLink onClick={() => setLanguage('fr-FR')}
                                        className="Header__flagLink">🇫🇷</HeaderLink>
                        </li> : null
                }
                {session.user ?
                    (<>
                            <li className="Header__navListElement">
                                <HeaderLink to="/me">{session.user.username}</HeaderLink>
                            </li>
                            <li className="Header__navListElement">
                                <HeaderLink onClick={props.logout}>Logout</HeaderLink>
                            </li>
                        </>
                    )
                    :
                    <>
                        <li className="Header__navListElement">
                            <HeaderLink to="/register">Register</HeaderLink>
                        </li>
                        <li className="Header__navListElement">
                            <HeaderLink to="/login">Login</HeaderLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    </header>)
}
