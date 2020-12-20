import React from "react";
import {User} from "./openapi/models";

export interface Session {
    user?: User;
    webSocket?: WebSocket;
}

export const SessionContext = React.createContext<Session>({
});
