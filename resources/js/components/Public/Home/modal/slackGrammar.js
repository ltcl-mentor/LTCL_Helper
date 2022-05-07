import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

// 各パーツのスタイル設定
const styleMargin = { mb: 3 };
const stylePadding = { paddingTop: 2 };
const styleCursor = { ursor: "pointer" };
const styleA = { 
    textDecoration: "underline", 
    margin: 0
};
const styleContent = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};
const styleReturnButton = {
    color: "#771AF8",
    border: "1px solid #771AF8",
    "&:hover": {
        border: "1px solid #771AF8",
        backgroundColor: "#771AF8",
        color: "white"
    }
};


/**
 * slack文法
 */
const slackGrammar = (props) => {
    let width;
    if (props.isWide) {
        width = { width: '50%'};
    } else {
        width = { width: '90%'};
    }
    
    return (
        <React.Fragment>
            <div>
                <a href={props.link} target="_blank" style={styleA}>
                    slackのリアクションはこちらのサイトの通りに記載してください。
                </a>
                <p onClick={props.handleOpen} style={styleCursor}>
                    slack文法
                </p>
            </div>
                
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={[styleContent, width]}>
                    <Typography align="center" variant="h6" sx={styleMargin}>
                        以下のもので文字を囲ってください
                    </Typography>
                    <Typography>
                        * ： 太字
                        <br />
                        ` ： インラインコードブロック
                        <br />
                        ``` ： コードブロック
                        <br />
                    </Typography>

                    <Typography align="center" sx={stylePadding}>
                        <Button size="small" variant="outlined" onClick={props.handleClose} sx={styleReturnButton}>
                            戻る
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default slackGrammar;