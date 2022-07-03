import React, {useState, useEffect} from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Breadcrumbs from '../../../Components/Common/Breadcrumbs';
import Documents from '../../Question/Show/documents';

/**
 * 参考記事一覧のメインコンポーネント
 */
function Index() {
    const [default_documents , setDefaultDocuments] = useState([]);
    const [documents , setDocuments] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [beginner, setBeginner] = useState(false);
    const [amature, setAmature] = useState(false);
    const [master, setMaster] = useState(false);
    const [all ,setAll] = useState(false);

    // 画面描画時に実行
    useEffect(() => {
        // 参考記事全権取得
        axios
            .get("/react/documents/all")
            .then(response => {
                setDefaultDocuments(response.data);
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    // 対象者の指定が変更された場合に実行
    useEffect(() => {
        var keyword_documents = [];
        // キーワードが未入力の場合
        if (keyword.trim().length === 0) {
            keyword_documents = default_documents;
        } else {
            default_documents.map((doc) => {
                doc.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 && keyword_documents.push(doc);
            });
        }

        var target_documents = [];
        // 対象者のいづれかが選択されていた場合
        if (beginner || amature || master || all) {
            keyword_documents.map((doc) => {
                if (beginner) {
                    doc.beginner && target_documents.push(doc);
                }
                if (amature) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.amature && target_documents.push(doc);
                    }
                }
                if (master) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.matser && target_documents.push(doc);
                    }
                } else if (all) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.all && target_documents.push(doc);
                    }
                }
            });
            setDocuments(target_documents);
        } else {
            setDocuments(keyword_documents);
        }

    },[keyword, beginner, amature, master, all]);

    // キーワード入力
    const handleKeyword = (event) => {
        // 入力に空白があれば"/"に置換
        setKeyword(event.target.value);
    };

    // ボタンの表示切り替え
    const handleSelect = (whitch) => {
        switch (whitch) {
            case "beginner":
                beginner ? setBeginner(false) : setBeginner(true);
                break;

            case "amature":
                amature ? setAmature(false) : setAmature(true);
                break;

            case "master":
                master ? setMaster(false) : setMaster(true);
                break;

            case "all":
                all ? setAll(false) : setAll(true);
                break;
        }
    };

    return (
        <div className="container">
            <Breadcrumbs page="public_document_index"/>

            <Grid container spacing={2} sx={{ flexGrow: 1, marginBottom: 3 }} justifyContent="center">
                <Grid item sx={{ width: "100%" }}>
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: "40%",
                            minWidth: "350px",
                            margin: "0 auto", }}
                    >
                        <Input
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="キーワードを入力してください。"
                            onChange={ (event) => handleKeyword(event) }
                            onKeyDown={ (event) => {
                                if (event.key === 'Enter')
                                event.preventDefault();
                            }}
                        />
                        <IconButton sx={{ p: '10px' }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item >
                    <Button
                        variant={ beginner ? "contained" : "outlined" }
                        color="success"
                        onClick={ () => handleSelect("beginner") }
                    >
                        初級者向け
                    </Button>
                </Grid>
                <Grid item >
                    <Button
                        variant={ amature ? "contained" : "outlined" }
                        color="info"
                        onClick={ () => handleSelect("amature") }
                    >
                        中級者向け
                    </Button>
                </Grid>
                <Grid item >
                    <Button
                        variant={ master ? "contained" : "outlined" }
                        color="secondary"
                        onClick={ () => handleSelect("master") }
                    >
                        上級者向け
                    </Button>
                </Grid>
                <Grid item >
                    <Button
                        variant={ all ? "contained" : "outlined" }
                        color="error"
                        onClick={ () => handleSelect("all") }
                    >
                        全員向け
                    </Button>
                </Grid>
            </Grid>

            <Documents
                documents={ documents }
            />
        </div>
    );
}

export default Index;
