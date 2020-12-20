import {
    DefaultApi,
    WebSocketClientChatMessage,
    WebSocketMessage,
    WebSocketMessageTypeEnum,
    WebSocketServerChatMessage
} from "./openapi";
import {useContext, useState} from "react";
import {SessionContext} from "./SessionContext";
import {Redirect} from "react-router-dom";

export interface ChatProps {
    api: DefaultApi;
}

export function ChatPage(props: ChatProps) {
    const session = useContext(SessionContext);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<WebSocketServerChatMessage[]>([]);

    if (session.user == null) {
        return <Redirect to="/"/>
    }
    if (session.webSocket == null) {
        return <Redirect to="/"/>
    }

    const sendMessage = (e: any) => {
        if (session.webSocket == null) {
            throw new Error('webSocket is null');
        }
        const webSocketMessage: WebSocketClientChatMessage = {
            type: WebSocketMessageTypeEnum.WebSocketClientChatMessage,
            message,
        };
        session.webSocket.send(JSON.stringify(webSocketMessage));
    };
    session.webSocket.onmessage = (e) => {
        const message = JSON.parse(e.data) as WebSocketMessage;
        switch (message.type) {
            case WebSocketMessageTypeEnum.WebSocketServerChatMessage:
                setMessages(messages.concat(message));
                break;
        }
    };
    return (
        <div>
            <div>
                {
                    messages.map(m => <div>{m.sender}: {m.message}</div>)
                }
            </div>
            <div>
                <input onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" onClick={sendMessage}>Send</button>
            </div>

        </div>);
}
