import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";

// articleのロジック
export const useArticle = ({ category, documentIndex }) => {
    const [keyword, setKeyword] = useState('');
    const [rank, setRank] = useState({ beginner: false, amature: false, master: false, all: false });
    const [documents , setDocuments] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0,
    });

    const handlePageClick = useCallback(async(event, index) => {
        // 検索結果の質問取得
        const res = await axios.get(route('getData.document', { category: category, page: index }));
        setDocuments({
            eventList: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            currentPage: res.data.current_page,
            lastPage: res.data.last_page,
        });
    });

    // キーワード入力
    const handleKeyword = useCallback((event) => {
        setKeyword(event.target.value);
    });

    // ボタンの表示切り替え
    const handleSelect = useCallback((which) => {
        setRank({ ...rank, [which]: !rank[which] });
    });

    // 対象者の指定が変更された場合に実行
    useEffect(() => {
        let keyword_documents = [];
        if (keyword.trim().length === 0) { // キーワードが未入力の場合
            keyword_documents = documentIndex.eventList;
        } else {
            documentIndex.eventList.map((doc) => {
                doc.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 && keyword_documents.push(doc);
            });
        }

        let target_documents = [];
        if (rank.beginner || rank.amature || rank.master || rank.all) { // 対象者のいづれかが選択されていた場合
            keyword_documents.map((doc) => {
                if (rank.beginner) {
                    doc.beginner && target_documents.push(doc);
                }
                if (rank.amature) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.amature && target_documents.push(doc);
                    }
                }
                if (rank.master) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.matser && target_documents.push(doc);
                    }
                }
                if (rank.all) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.all && target_documents.push(doc);
                    }
                }
            });
            setDocuments({...documentIndex, eventList: target_documents});
        } else {
            setDocuments({...documentIndex, eventList: keyword_documents});
        }
    },[keyword, rank]);

    return [{ documents, rank }, { handlePageClick, handleKeyword, handleSelect }];
}
