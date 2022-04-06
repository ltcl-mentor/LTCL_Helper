import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

/**
 * トピックの選択肢
 */
const Topic = (props) => {
    // const [topic, setTopic] = useState(0);
    
    // 画面描画時に実行
    // useEffect(() => {
    //     if (props.IsCanceling)  props.setIsCanceling(false);
    // }, []);
    
    // カテゴリーが変更されたら実行
    useEffect(() => {
        props.category === 0 ? props.setTopic(0) : props.setTopic(14);
    }, [props.category]);
    
    // useEffect(() => {
    //     if (props.isCanceling) {
    //         setTopic(0);
    //         props.setIsCanceling(false);
    //     }
    // }, [props.isCanceling]);
    
    // 選択されたトピック情報を取得
    const handleTopic = (event) => {
        props.setTopic(Number(event.target.value));
    };
    
    let topicForm;
    // カテゴリーの選択がカリキュラムだった場合
    if (props.category === 0) {
        topicForm = (
            <FormControl component="fieldset">
                <RadioGroup row aria-label="topic" name="topic" value={ props.topic } onChange={ (event) => handleTopic(event) }>
                    <FormControlLabel value={0} control={ <Radio /> } label="AWS" />
                    <FormControlLabel value={1} control={ <Radio /> } label="HTML" />
                    <FormControlLabel value={2} control={ <Radio /> } label="CSS" />
                    <FormControlLabel value={3} control={ <Radio /> } label="JavaScript" />
                    <FormControlLabel value={4} control={ <Radio /> } label="サーバー" />
                    <FormControlLabel value={5} control={ <Radio /> } label="PHP" />
                    <FormControlLabel value={6} control={ <Radio /> } label="Laravel" />
                    <FormControlLabel value={7} control={ <Radio /> } label="データベース" />
                    <FormControlLabel value={8} control={ <Radio /> } label="Git&GitHub" />
                    <FormControlLabel value={9} control={ <Radio /> } label="マイグレーション" />
                    <FormControlLabel value={10} control={ <Radio /> } label="リレーション" />
                    <FormControlLabel value={11} control={ <Radio /> } label="認証・認可機能(カリキュラム)" />
                    <FormControlLabel value={12} control={ <Radio /> } label="API(カリキュラム)" />
                    <FormControlLabel value={13} control={ <Radio /> } label="その他(カリキュラム)" />
                </RadioGroup>
            </FormControl>
        );
    
    //カテゴリーの選択が成果物だった場合
    } else if (props.category === 1) {
        topicForm = (
            <FormControl component="fieldset">
                <RadioGroup row aria-label="topic" name="topic" value={ props.topic } onChange={ (event) => handleTopic(event) }>
                    <FormControlLabel value={14} control={ <Radio /> } label="認証・認可機能(成果物)" />
                    <FormControlLabel value={15} control={ <Radio /> } label="API(成果物)" />
                    <FormControlLabel value={16} control={ <Radio /> } label="画像処理" />
                    <FormControlLabel value={17} control={ <Radio /> } label="Heroku環境" />
                    <FormControlLabel value={18} control={ <Radio /> } label="デザイン" />
                    <FormControlLabel value={19} control={ <Radio /> } label="その他(成果物)" />
                </RadioGroup>
            </FormControl>
        );
    }
    
    return (
        <React.Fragment>
            { topicForm }
        </React.Fragment>
    );
};

export default Topic;