import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

/**
 * トピックフォーム
 */
const TopicForm = props => {
    const topics = [
        // カリキュラム
        "AWS",
        "HTML",
        "CSS",
        "JavaScript",
        "サーバー",
        "PHP",
        "Laravel",
        "DB",
        "Git&GitHub",
        "マイグレーション",
        "リレーション",
        "認証・認可機能(カリキュラム)",
        "API(カリキュラム)",
        "その他(カリキュラム)",
        // 成果物
        "認証・認可機能(成果物)",
        "API(成果物)",
        "画像処理",
        "Heroku環境",
        "デザイン",
        "その他(成果物)"
    ];
    const [mountCount, setMountCount] = useState(0);

    // カテゴリーの値変更時に実行
    useEffect(() => {
        // 初回マウント時（編集ページを開いた直後）にsetTopicが動いてしまうと初期値が変更されしまうので、
        // 初回(mountCount = 1)だけ避けるようにmountCountを利用
        setMountCount(mountCount + 1);
        if (mountCount !== 1) {
            props.category === 0 ? props.setTopic(0) : props.setTopic(11);
        }
    }, [props.category]);

    const handleTopic = event => {
        props.setTopic(Number(event.target.value));
        props.setCurriculumNumber("");
    };

    let topic;
    if (props.category === 0) {
        topic = (
            <div className="carriculum">
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="topic"
                        name="post[topic]"
                        value={Number(props.topic)}
                        onChange={event => handleTopic(event)}
                    >
                        <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="AWS"
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="HTML"
                        />
                        <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="CSS"
                        />
                        <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label="JavaScript"
                        />
                        <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label="サーバー"
                        />
                        <FormControlLabel
                            value={5}
                            control={<Radio />}
                            label="PHP"
                        />
                        <FormControlLabel
                            value={6}
                            control={<Radio />}
                            label="Laravel"
                        />
                        <FormControlLabel
                            value={7}
                            control={<Radio />}
                            label="データベース"
                        />
                        <FormControlLabel
                            value={8}
                            control={<Radio />}
                            label="Git&GitHub"
                        />
                        <FormControlLabel
                            value={9}
                            control={<Radio />}
                            label="マイグレーション"
                        />
                        <FormControlLabel
                            value={10}
                            control={<Radio />}
                            label="リレーション"
                        />
                        <FormControlLabel
                            value={11}
                            control={<Radio />}
                            label="認証・認可機能(カリキュラム)"
                        />
                        <FormControlLabel
                            value={12}
                            control={<Radio />}
                            label="API(カリキュラム)"
                        />
                        <FormControlLabel
                            value={13}
                            control={<Radio />}
                            label="その他(カリキュラム)"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    } else {
        topic = (
            <div className="portfolio">
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="topic"
                        name="post[topic]"
                        value={Number(props.topic)}
                        onChange={event => {
                            handleTopic(event);
                        }}
                    >
                        <FormControlLabel
                            value={14}
                            control={<Radio />}
                            label="認証・認可機能(成果物)"
                        />
                        <FormControlLabel
                            value={15}
                            control={<Radio />}
                            label="API(成果物)"
                        />
                        <FormControlLabel
                            value={16}
                            control={<Radio />}
                            label="画像処理"
                        />
                        <FormControlLabel
                            value={17}
                            control={<Radio />}
                            label="Heroku環境"
                        />
                        <FormControlLabel
                            value={18}
                            control={<Radio />}
                            label="デザイン"
                        />
                        <FormControlLabel
                            value={19}
                            control={<Radio />}
                            label="その他(成果物)"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }

    return <div>{topic}</div>;
};

export default TopicForm;
