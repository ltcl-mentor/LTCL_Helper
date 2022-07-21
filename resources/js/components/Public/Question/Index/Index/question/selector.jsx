import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Selector } from '@/Styles/Public/Question/Index/Index/Index';

/**
 * ステータス選択
 */
const selector = ({ handleStatus }) => {
    return (
        <Selector>
            <TextField
                label="質問を絞り込む"
                select
                defaultValue={""}
                fullWidth
                onChange={(event) => handleStatus(event)}
            >
                <MenuItem value={4}>全て表示</MenuItem>
                <MenuItem value={0}>未対応</MenuItem>
                <MenuItem value={1}>対応中</MenuItem>
                <MenuItem value={2}>解決済</MenuItem>
                <MenuItem value={3}>要対応</MenuItem>
            </TextField>
        </Selector>
    )
}

export default selector;
