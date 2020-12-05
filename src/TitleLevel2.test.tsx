import React from "react";
import {DefaultApi, GetArticleByIdRequest} from "./openapi/apis";
import {of, throwError} from "rxjs";
import {mockDefaultApi} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Article} from "./openapi/models";
import {AjaxError} from "rxjs/ajax";
import {ArticleFull} from "./ArticleFull";
import {MemoryRouter} from "react-router-dom";
import {TitleLevel2} from "./TitleLevel2";

let container: HTMLDivElement;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    if (container != null) {
        unmountComponentAtNode(container);
        container.remove();
    }
});

describe('TitleLevel2', () => {
    it("renders properly", () => {
        act(() => {
            render( <TitleLevel2>Title</TitleLevel2> , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
});
