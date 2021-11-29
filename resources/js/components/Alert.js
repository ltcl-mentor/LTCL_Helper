import React, {useState} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// postリクエストの処理が成功した際に画面上部に出力するメッセージ
function AlertMessage(props) {
    const [open, setOpen] = useState(true);
    
    let message;
    switch (props.type) {
        case "question":
            switch (props.status) {
                case "created":
                    message = <AlertTitle>質問を投稿しました。</AlertTitle>;
                    break;
                   
                case "edited":
                    message = <AlertTitle>質問を編集しました。</AlertTitle>;
                    break;
                    
                case "deleted":
                    message = <AlertTitle>質問を{ props.info }件削除しました。</AlertTitle>;
                    break;
                   
                case "published":
                    message = <AlertTitle>質問を公開しました。</AlertTitle>;
                    break;
                
                case "unpublished":
                    message = <AlertTitle>質問を非公開にしました。</AlertTitle>;
                    break;
            }
            break;
        
        case "document":
            switch (props.status) {
                case "created":
                    message = <AlertTitle>記事を投稿しました。</AlertTitle>;
                    break;
                
                case "edited":
                    message = <AlertTitle>記事を編集しました。</AlertTitle>;
                    break;
                    
                case "deleted":
                    message = <AlertTitle>記事を{ props.info }件削除しました。</AlertTitle>;
                    break;
            }
            break;
            
        case "link_from_question":
            switch (props.status) {
                case "attached":
                    message = <AlertTitle>関連記事を{ props.info }件設定しました。</AlertTitle>;
                    break;
                
                case "detached":
                    message = <AlertTitle>関連記事を{ props.info }件解除しました。</AlertTitle>;
                    break;
                    
                case "attached_and_detached":
                    message = <AlertTitle>関連記事を{ props.info[0] }件設定、{ props.info[1] }件解除しました。</AlertTitle>;
                    break;
            }
            break;
        
        case "link_from_document":
            switch (props.status) {
                case "attached":
                    message = <AlertTitle>関連質問を{ props.info }件設定しました。</AlertTitle>;
                    break;
                
                case "detached":
                    message = <AlertTitle>関連質問を{ props.info }件解除しました。</AlertTitle>;
                    break;
                    
                case "attached_and_detached":
                    message = <AlertTitle>関連質問を{ props.info[0] }件設定、{ props.info[1] }件解除しました。</AlertTitle>;
                    break;
            }
            break;
            
        case "user":
            switch (props.status) {
                case "admin_created":
                    message = <AlertTitle>ユーザ（管理者）を{ props.info }名追加しました。</AlertTitle>;
                    break;
                
                case "public_created":
                    message = <AlertTitle>ユーザ（受講生）を{ props.info }名追加しました。</AlertTitle>;
                    break;
                    
                case "deleted":
                    message = <AlertTitle>ユーザID{ props.info }のデータを削除しました。</AlertTitle>;
                    break;
            }
            break;
        
        case "info":
            switch (props.status) {
                case "created":
                    message = <AlertTitle>お知らせを追加しました。</AlertTitle>;
                    break;
                    
                case "deleted":
                    message = <AlertTitle>お知らせを削除しました。</AlertTitle>;
                    break;
            }
            break;
        
        case "contact":
            switch (props.status) {
                case "created":
                    message = <AlertTitle>お問い合わせを送信しました。</AlertTitle>;
                    break;
            }
            break;
    }
    
    return (
        <div>
            { props.status &&
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity="success"
                        sx={{
                            margin: "0 auto",
                            width: "70%",
                            mb: 2, 
                        }}
                    >
                        { message }
                    </Alert>
                </Collapse>
            }
        </div>
    );
}

export default AlertMessage;