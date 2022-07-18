import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BackButton, ButtonArea, Content, Link, SubHeading } from "@/Styles/Shared/Modal/slackGrammar";

/**
 * slack文法
 */
const slackGrammar = ({ link, handleOpen, open, handleClose }) => {
    return (
        <React.Fragment>
            <div>
                <Link href={link} target="_blank">
                    slackのリアクションはこちらのサイトの通りに記載してください。
                </Link>
                <p onClick={handleOpen} style={{ cursor: 'pointer' }}>slack文法</p>
            </div>

            <Modal open={open}>
                <Content>
                    <SubHeading>以下のもので文字を囲ってください</SubHeading>
                    <Typography>
                        * ： 太字<br />
                        ` ： インラインコードブロック<br />
                        ``` ： コードブロック<br />
                    </Typography>
                    <ButtonArea>
                        <BackButton
                            size="small"
                            variant="outlined"
                            onClick={handleClose}
                        >
                            戻る
                        </BackButton>
                    </ButtonArea>
                </Content>
            </Modal>
        </React.Fragment>
    );
};

export default slackGrammar;
