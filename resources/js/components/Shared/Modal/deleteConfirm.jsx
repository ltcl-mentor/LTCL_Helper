import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CloseButton } from "@/Components/Shared/Modal/sharedPart";
import { Content } from "@/Styles/Shared/Modal/modal";
import { WarningBody, WarningTitle } from "@/Styles/Shared/Modal/deleteConfirm";
import { ButtonArea } from "@/Styles/Shared/Modal/slackGrammar";

/**
 * 削除確認モーダル
 */
const deleteConfirm = ({ open, setOpen, deleted }) => {
    return (
        <Modal open={open}>
            <Content>
                <CloseButton onClose={() => setOpen(false)} />
                <WarningTitle>WARNING！</WarningTitle>
                <WarningBody>
                    削除すると元に戻せません。
                    <br />
                    本当に削除しますか？
                </WarningBody>
                <ButtonArea>
                    <Button
                        size="large"
                        color="error"
                        variant="contained"
                        onClick={() => deleted()}
                    >
                        削除
                    </Button>
                </ButtonArea>
            </Content>
        </Modal>
    );
};

export default deleteConfirm;
