import React, { useState, useEffect } from "react";
import axios from "./axios";
export default function ArticleDelete(props) {
    const id = props.articleid;
    console.log(id);

    useEffect(() => {
        (async () => {})();
    }, []);
    async function deleteArticle() {
        try {
            await axios.post(`/admin/deleteArticle/${id}.json`);
            props.handler();
        } catch (err) {
            console.log("err in deleting article", err);
        }
    }
    return <button onClick={deleteArticle}>Delete</button>;
}
