import React from "react";
import {User} from "./openapi/models";

export interface Session {
    user?: User;
}

export const SessionContext = React.createContext<Session>({
});
