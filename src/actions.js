import axios from "./axios";

export async function articlesList(articles) {
    console.log("articles:", articles);
    return {
        type: "ARTICLES_LIST",
        articles
    };
}
export async function getArticlesList() {
    try {
        const { data } = await axios.get("/admin/articleLists.json");
        return {
            type: "GET_ALL_ARTICLES_LIST",
            users: data.rows
        };
    } catch (err) {
        console.log("err in get all article lists", err);
    }
}
