import {ArticleForm} from "./ArticleForm";
import {DefaultApi} from "./openapi/apis";
import {RandomService} from "./RandomService";
import {useParams} from "react-router-dom";

interface ArticleFormRouterWrapperProps {
    api: DefaultApi;
    randomService: RandomService;
}

interface ArticleFormRouterWrapperParams {
    id: string;
}

export function ArticleFormRouterWrapper(props: ArticleFormRouterWrapperProps) {
    const params = useParams<ArticleFormRouterWrapperParams>();
    return (
        <ArticleForm api={props.api}
                     randomService={props.randomService}
                     articleId={params.id}/>
    )
}
