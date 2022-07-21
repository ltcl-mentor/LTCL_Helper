import React from 'react';
import Button from '@mui/material/Button';
import { GridItem } from '@/Styles/Public/Question/Index/Index/Index';

const colors = {
    beginner: "success",
    amature: "info",
    master: "secondary",
    all: "error"
};

/**
 * 記事のランクボタン
 */
const rankButton = ({ children, rank, handleSelect }) => {
    let status;
    switch (children) {
        case "初心者向け": status = "beginner"; break;
        case "中級者向け": status = "amature"; break;
        case "上級者向け": status = "master"; break;
        case "全員向け": status = "all"; break;
    }

    return (
        <GridItem item>
            <Button
                variant={rank ? "contained" : "outlined"}
                color={colors[status]}
                onClick={() => handleSelect(status)}
                size = 'large'
            >
                {children}
            </Button>
        </GridItem>
    );
}

export default rankButton;
