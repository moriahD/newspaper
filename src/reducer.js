export default function(state = {}, action) {
    if (action.type == "ARTICLES_LIST") {
        state = {
            ...state,
            articles: action.articles
        };
    } else if (action.type == "GET_ALL_ARTICLES_LIST") {
        state = {
            ...state,
            articles: action.articles
        };
    }
    return state;
}
