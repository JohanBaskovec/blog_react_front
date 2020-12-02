import React from 'react';
import './App.scss';
import './MainPageContent.scss';
import {DefaultApi} from "./openapi/apis";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ArticleList} from "./ArticleList";
import {ArticleFull} from "./ArticleFull";
import {ArticleForm} from "./ArticleForm";
import {Header} from "./Header";

export interface AppProps {
    api?: DefaultApi;
}

function App({api}: AppProps) {
    if (api == null) {
        api = new DefaultApi();
    }
    const headerHeight = "3rem";
    const mainPageContentBasis = "70%";
    // noinspection CheckTagEmptyBody
    return (
        <Router>
            <div className="App" style={{marginTop: headerHeight}}>
                <Header style={{height: headerHeight}}
                        contentWidth={mainPageContentBasis}></Header>
                <main className="MainPageContent"
                      style={{flexBasis: mainPageContentBasis}}>
                    <Switch>
                        <Route path="/article/:id/edit">
                            <ArticleForm api={api}/>
                        </Route>
                        <Route path="/article/:id">
                            <ArticleFull api={api}/>
                        </Route>
                        <Route path="/">
                            <ArticleList api={api}/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
