import React, {useState, useEffect} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom';
import axios from "axios";

import Alert from '../../../../Alert';
import Breadcrumbs from '../../../../Common/Breadcrumbs';
import Parameters from './parameters';
import Links from './links';

/**
 * 単体記事から質問への紐付け（詳細画面）のメインコンポーネント
 */
function Index() {
    const { id } = useParams();
    const parameter = useLocation();
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [doc, setDoc] = useState([]);
    const [attach_id, setAttachId] = useState([]);
    const [detach_id, setDetachId] = useState([]);

    // 画面描画時に実行
    useEffect(() => {
        // 該当記事データ取得
        axios
            .get(`/react/document/${ id }`)
            .then(response => {
                setDoc(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = () => {
        // フォーム送信と重複保存の防止
        if (clickCount === 0) {
            setClickCount(1);
            axios
                .post(`/links/document/${ id }`, {
                    attach_id: attach_id,
                    detach_id: detach_id,
                })
                .then(response => {
                    if (response.status === 200) {
                        // フォーム送信の重複保存防止のカウントをリセット
                        setClickCount(0);

                        window.scroll({top:0});

                        console.log(response.data.whitch_do);
                        switch (response.data.whitch_do) {
                            case "attached":
                                history.push(`/links/document/${ response.data.id }`, { link: "attached", number: response.data.attach_count });
                                break;

                            case "detached":
                                history.push(`/links/document/${ response.data.id }`, { link: "detached", number: response.data.detach_count });
                                break;

                            case "attached_and_detached":
                                history.push(`/links/document/${ response.data.id }`, { link: "attached_and_detached", number: [response.data.attach_count, response.data.detach_count]});
                                break;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            return false;
        }
    };

    return (
        <div className="container">
            <Alert
                type="link_from_document"
                status={ parameter.state && parameter.state.link }
                info={ parameter.state && parameter.state.number }
            />

            <Breadcrumbs page="mentor_link_document_show"/>

            <Parameters
                title={ doc.title }
                targets={ [
                    doc.beginner ? "初心者" : false,
                    doc.amature ? "中級者" : false,
                    doc.master ? "上級者" : false,
                    doc.all ? "全員" : false,
                ] }
                link={ doc.link }
                author={ doc.user_id }
            />

            <Links
                id={ id }
                setAttachId={ setAttachId }
                setDetachId={ setDetachId }
                handleSubmit={ handleSubmit }
            />
        </div>
    );
}

export default Index;
