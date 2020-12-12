import React, {useEffect, useState} from 'react';
import './App.scss';
import './MainPageContent.scss';
import {DefaultApi} from "./openapi/apis";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ArticleList} from "./ArticleList";
import {ArticleFull} from "./ArticleFull";
import {Header} from "./Header";
import {RandomService} from "./RandomService";
import {ArticleFormRouterWrapper} from "./ArticleFormRouterWrapper";
import {Session, SessionContext} from "./SessionContext";
import {LoginPage} from "./LoginPage";
import {User} from "./openapi/models";
import assert from "assert";
import {Configuration} from "./openapi";
import {ServiceUnavailablePage} from "./ServiceUnavailablePage";

export interface AppProps {
    api?: DefaultApi;
    randomService?: RandomService;
}

function App(props: AppProps) {
    const [randomService, setRandomService] = useState<RandomService>(
        props.randomService == null ? new RandomService() : props.randomService);

    const [api, setApi] = useState<DefaultApi>(
        props.api == null ? new DefaultApi(new Configuration({
                middleware: [
                    {
                        pre: (args) => {
                            args.withCredentials = true;
                            return args;
                        }
                    }
                ]
            }))
            : props.api
    );
    const [session, setSession] = useState<Session>({
        user: undefined,
    });
    const [serviceUnavailable, setServiceUnavailable] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        assert(api != null);
        api.getCurrentAuthenticatedUser().subscribe((user: User) => {
                setSession({user});
                setLoading(false);
            },
            (err) => {
                if (err.name && err.name === 'AjaxError') {
                    switch (err.status) {
                        case 0:
                            setServiceUnavailable(true);
                            break;
                        case 401:
                            setSession({});
                            break;
                        default:
                            break;
                    }
                }
                setLoading(false);
            });
    }, []);

    function logout() {
        api.logout().subscribe(() => {
            setSession({});
        });
    }

    if (loading) {
        return (<div>Loading user...</div>);
    }

    const headerHeight = 3;
    const mainPageContentBasis = "70%";
    // noinspection CheckTagEmptyBody
    return (
        <SessionContext.Provider value={session}>
            <Router>
                <div className="App">
                    <Header style={{height: headerHeight + "rem"}}
                            logout={logout}
                            contentWidth={mainPageContentBasis}></Header>
                    <main className="MainPageContent"
                          style={{flexBasis: mainPageContentBasis, paddingTop: (headerHeight + 1) + "rem" }}>
                        {serviceUnavailable ?
                            <ServiceUnavailablePage/> :
                            <Switch>
                                <Route path="/article/:id/edit">
                                    <ArticleFormRouterWrapper api={api} randomService={randomService}/>
                                </Route>
                                <Route path="/article/new">
                                    <ArticleFormRouterWrapper api={api} randomService={randomService}/>
                                </Route>
                                <Route path="/article/:id">
                                    <ArticleFull api={api}/>
                                </Route>
                                <Route path="/login">
                                    <LoginPage api={api} setSession={setSession}/>
                                </Route>
                                <Route path="/">
                                    <ArticleList api={api}/>
                                </Route>
                            </Switch>
                        }
                    </main>
                </div>
            </Router>
        </SessionContext.Provider>
    );
}

export default App;
