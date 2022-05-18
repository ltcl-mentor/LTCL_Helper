import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ConfirmButton from "../../../../Atom/Button/ConfirmButton";
import { styleReleaseButton } from "../../../../Atom/Typography/TypographyStyle";
import { styleCheckBoxGroupBox } from "../../../../Atom/Box/BoxStyle";

/**
 * 質問公開のためのチェックフォーム
 */
function CheckForm(props) {
    const history = useHistory();
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);

    const handleCheck1 = () => {
        if (check1) {
            setCheck1(false);
        } else {
            setCheck1(true);
        }
    };

    const handleCheck2 = () => {
        if (check2) {
            setCheck2(false);
        } else {
            setCheck2(true);
        }
    };

    const handleCheck3 = () => {
        if (check3) {
            setCheck3(false);
        } else {
            setCheck3(true);
        }
    };

    // 質問公開処理
    const handlePublish = () => {
        axios
            .post(`/questions/${props.question_id}/check`)
            .then(response => {
                if (response.status === 200) {
                    props.setQuestion(response.data);
                    history.push(`/questions/${props.question_id}`, {
                        question: "published"
                    });
                    props.handleClose();
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    let btn;
    if (check1 && check2 && check3) {
        btn = (
            <Typography component="div" align="center" sx={styleReleaseButton}>
                <ConfirmButton type="submit" onClick={handlePublish}>
                    公開する
                </ConfirmButton>
            </Typography>
        );
    } else {
        btn = (
            <Typography component="div" align="center" sx={styleReleaseButton}>
                <ConfirmButton>公開する</ConfirmButton>
            </Typography>
        );
    }

    return (
        <Box>
            <Box sx={styleCheckBoxGroupBox}>
                <h5>以下の確認事項を確認してチェックを入れてください。</h5>

                <FormControlLabel
                    control={<Checkbox onClick={handleCheck1} value={check1} />}
                    label="誤字、脱字、不適切な表現はありませんか？"
                />
                <FormControlLabel
                    control={<Checkbox onClick={handleCheck2} value={check2} />}
                    label="（参考画像がある場合）個人情報が漏洩するような部分はありませんか？"
                />
                <FormControlLabel
                    control={<Checkbox onClick={handleCheck3} value={check3} />}
                    label="公開する内容に間違いはありませんか？"
                />

                {btn}
            </Box>
        </Box>
    );
}

export default CheckForm;
