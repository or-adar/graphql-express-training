import GraphqlOptions from "./graphql-options";
import renderPlayground from "./render-graphql-playground";
import ExpressMiddleware from "./express-middleware";

function graphqlPlaygroundExpress(options: GraphqlOptions): ExpressMiddleware {
    return (request, response, next) => {
        response.header('Content-Type', 'text/html');
        const playground = renderPlayground(options);
        response.write(playground);
        response.end();
    }
}

export default graphqlPlaygroundExpress;