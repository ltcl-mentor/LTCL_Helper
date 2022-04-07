import React, {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import axios from "axios";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import Breadcrumbs from '../../../../Breadcrumbs';
import Questions from './questions';
import Article from './article';

/**
 * 質問一覧(公開)のメインコンポーネント
 */
function Index() {
    const { id } = useParams();
    const [value, setValue] = React.useState(0);
    const [documents, setDocuments] = useState([]);
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
        pageRangeDisplayed: 10,
        lastPage: 0,
    });
    let val = 3;
    if (id < 14) {
            val = 0;
        } else {
            val = 1;
        }
    //画面描画時に実行
    useEffect(() => {
        let questionsId = [];
        const queries = {questionsId: questionsId};
        // 公開されている質問を全件取得
        axios
            .get(`/react/questions/search/paginate?category=${ val }&topic=${ id }`)
            .then(response => {
                console.log(response.data);
                setQuestions({
                        eventList: response.data.data,
                        itemsCountPerPage: response.data.per_page,
                        totalItemsCount: response.data.total,
                        currentPage: response.data.current_page,
                        pageRangeDisplayed: 10,
                        lastPage: response.data.last_page,
                    });
                response.data.data.map((question) => {
                    questionsId.push(question.id)
                })
                
                // 質問に関連する全参考記事を取得
            axios
                .get(`/react/documents/related/${ id }`, {params: queries})
                .then(response => {
                    console.log(response);
                    let documentsData = []
                    response.data.map((data) => {
                        documentsData.push(...data.documents);
                    })
                    setDocuments(documentsData);
                    console.log(documentsData)
                }).catch(error => {
                    console.log(error);
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
            
            <Box sx={{ width: '95%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs TabIndicatorProps={{style: {backgroundColor: '#771AF8'}}} value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="質問" />
                        <Tab label="関連記事" />
                    </Tabs>
                </Box>
                
                { value === 0 ? <Questions questions={ questions } setQuestions={ setQuestions } category={ id } /> : <Article category={ id } documents={ documents } setDocuments={ setDocuments }/> }
            </Box>
        </div>
    );
}

export default Index;
