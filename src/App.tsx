import React from 'react';
import './App.css';
import {DefaultApi} from "./openapi/apis";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ArticleList} from "./ArticleList";
import {ArticleFull} from "./ArticleFull";

export interface AppProps {
    api?: DefaultApi;
}
function App({api}: AppProps) {
    if (api == null) {
        api = new DefaultApi();
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/article/:id">
                        <ArticleFull api={api} />
                    </Route>
                    <Route path="/">
                        <ArticleList api={api} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
