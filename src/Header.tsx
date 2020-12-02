import "./Header.scss";
import {AppLink} from "./AppLink";

export interface HeaderProps {
    style?: React.CSSProperties;
    contentWidth: string;
}

export function Header(props: HeaderProps) {
    return (<header className="Header" style={props.style}>
        <nav style={{flexBasis: props.contentWidth}}
             className="Header__nav">
            <ul className="Header__navList">
                <li className="Header__navListElement">
                    <AppLink color="white" to="/">Home</AppLink>
                </li>
            </ul>
        </nav>
    </header>)
}
