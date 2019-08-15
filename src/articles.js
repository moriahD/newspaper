import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import ArticleDelete from "./articleDelete";

export default function Articles() {
    const [lists, setList] = useState();
    const [val, setVal] = useState();

    useEffect(() => {
        (async () => {
            const list = await axios.get("/admin/articleLists.json");
            console.log("list.datal: ", list.data);
            setList(list.data);
        })();
    }, []);

    async function refreshArticles() {
        const list = await axios.get("/admin/articleLists.json");
        setList(list.data);
        console.log("2222");
    }
    return (
        <div
            className="articleLists"
            style={{ padding: "70px 20px 20px 20px" }}
        >
            this is article lists page
            {lists &&
                lists.map(list => (
                    <div key={list.id} className="listwrap">
                        <div className="list">
                            <p> {list.id}</p>
                            <p>{list.title}</p>
                            <p>{list.last_update}</p>
                            <Link to={`/user/${list.id}`}>
                                <button>Modify</button>
                            </Link>
                            <ArticleDelete
                                handler={refreshArticles}
                                articleid={list.id}
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}
