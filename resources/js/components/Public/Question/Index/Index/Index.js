import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from "axios";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@mui/material/Button';

import '../../../../../../../public/css/Public/question_index.css';
import Breadcrumbs from '../../../../Common/Breadcrumbs';
import QuestionsPC from './responsive/questionsPC';
import QuestionsMobile from './responsive/questionsMobile';
import ArticlePC from './responsive/articlePC';
import ArticleMobile from './responsive/articleMobile';
import {LoginUser} from "../../../../Route";
import useMedia from "use-media";
import BreakingPoint from "../../../../../Styles/BreakingPoint";

/**
 * 質問一覧(公開)のメインコンポーネント
 */
function Index() {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const user = useContext(LoginUser);
    const { id } = useParams();
    const [value, setValue] = React.useState(0);
    const [status, setStatus] = useState(4);
    const [documents, setDocuments] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0,
    });
    const topics = [
        // カリキュラムのトピック
        'AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'データベース', 'Git&GitHub', 'マイグレーション', 'リレーション', '認証・認可機能(カリキュラム)', 'API(カリキュラム)', 'その他(カリキュラム)',
        // 成果物のトピック
        '認証・認可機能(成果物)', 'API(成果物)', '画像処理', 'Heroku環境', 'デザイン', 'その他(成果物)'
    ];
    const [questions, setQuestions] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0,
    });
    let val = 0;
    if (id < 14) {
            val = 0;
        } else {
            val = 1;
        }
    let questionsUrl;
    if(user.is_admin){
        questionsUrl = `/react/questions/search/paginate?category=${ val }&topic=${ id }&admin=true&status=${ status }`;
    }else{
        questionsUrl = `/react/questions/search/paginate?category=${ val }&topic=${ id }`;
    }

    //画面描画時に実行
    useEffect(() => {
        // 公開されている質問を全件取得
        axios
            .get(questionsUrl)
            .then(response => {
                setQuestions({
                        eventList: response.data.data,
                        itemsCountPerPage: response.data.per_page,
                        totalItemsCount: response.data.total,
                        currentPage: response.data.current_page,
                        lastPage: response.data.last_page,
                    });
            }).catch(error => {
                console.log(error);
            });

        // 質問に関連する全参考記事を取得
        axios
            .get(`/react/documents/related/paginate/${ id }`)
            .then(response => {
                setDocuments({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
                console.log(error);
            });

    }, []);


    // タブの切り替え
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="container">
            <Breadcrumbs page="public_question_index"/>

            <Box marginBottom={1} sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                <Card sx={{  width: '140px', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography sx={{fontSize:"25px" }}>{topics[id]}</Typography>
                </Card>
            </Box>

            <Box display='flex' justifyContent='center'>
            <Box sx={{ width: '95%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs TabIndicatorProps={{style: {backgroundColor: '#771AF8'}}} value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="質問" />
                        <Tab label="関連記事" />
                    </Tabs>
                </Box>

                { value === 0 && isWide ?
                    <QuestionsPC questions={ questions } setQuestions={ setQuestions } category={ id } status={status} setStatus={setStatus}/>
                    : value === 0 ?
                    <QuestionsMobile questions={ questions } setQuestions={ setQuestions } category={ id } status={status} setStatus={setStatus}/>
                    : value === 1 && isWide ?
                    <ArticlePC category={ id } documents={ documents } setDocuments={ setDocuments }/>
                    :
                    <ArticleMobile category={ id } documents={ documents } setDocuments={ setDocuments }/>
                }
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button  component={Link} to="/?page=qa">Q&Aに戻る</Button>
                </Box>
            </Box>
            </Box>
        </div>
    );
}

export default Index;
