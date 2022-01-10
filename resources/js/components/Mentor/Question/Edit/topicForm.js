import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

/**
 * トピックフォーム
 */
function TopicForm(props) {
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    const [mountCount, setMountCount] = useState(0);
    
    // カテゴリーの値変更時に実行
    useEffect(() => {
        // 初回マウント時（編集ページを開いた直後）にsetTopicが動いてしまうと初期値が変更されしまうので、
        // 初回(mountCount = 1)だけ避けるようにmountCountを利用
        setMountCount(mountCount+1);
        if(mountCount !== 1){
            if(props.category === 0){
                props.setTopic(0);
            }else{
                props.setTopic(9);
            }
        }
    }, [props.category]);
    
    const handleTopic = (event) => {
        props.setTopic(Number(event.target.value));
    };
    
    let topic;
    if (props.category === 0) {
        topic = (
            <div className="carriculum">
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="topic" name="post[topic]" value={ Number(props.topic) } onChange={ (event) => handleTopic(event) }>
                        <FormControlLabel value={0} control={ <Radio /> } label="AWS" />
                        <FormControlLabel value={1} control={ <Radio /> } label="HTML" />
                        <FormControlLabel value={2} control={ <Radio /> } label="CSS" />
                        <FormControlLabel value={3} control={ <Radio /> } label="JavaScript" />
                        <FormControlLabel value={4} control={ <Radio /> } label="サーバー" />
                        <FormControlLabel value={5} control={ <Radio /> } label="PHP" />
                        <FormControlLabel value={6} control={ <Radio /> } label="Laravel" />
                        <FormControlLabel value={7} control={ <Radio /> } label="データベース" />
                        <FormControlLabel value={8} control={ <Radio /> } label="Git&GitHub" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    } else {
        topic = (
            <div className="portfolio">
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="topic" name="post[topic]" value={ Number(props.topic) } onChange={(event) => { handleTopic(event) }}>
                        <FormControlLabel value={9} control={ <Radio /> } label="マイグレーション" />
                        <FormControlLabel value={10} control={ <Radio /> } label="リレーション" />
                        <FormControlLabel value={11} control={ <Radio /> } label="Laravel拡張" />
                        <FormControlLabel value={12} control={ <Radio /> } label="画像処理" />
                        <FormControlLabel value={13} control={ <Radio /> } label="Heroku環境" />
                        <FormControlLabel value={14} control={ <Radio /> } label="API" />
                        <FormControlLabel value={15} control={ <Radio /> } label="デザイン" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
    
    return (
        <div>
            <p>変更前：{ topics[props.old_topic] }</p>
            { topic }
        </div>
    );
}

export default TopicForm;