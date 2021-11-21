import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function Breadcrumb(props){
    
    let link1;
    let link2;
    let link3;
    let link4;
    switch (props.page) {
        /* 公開部分 */
        case "history":
            link1 = (
                <Typography color="text.primary">
                    質問閲覧履歴
                </Typography>
            );
            break;
            
        case "freeword":
            link1 = (
                <Typography color="text.primary">
                    フリーワード検索
                </Typography>
            );
            break;
            
        case "condition":
            link1 = (
                <Typography color="text.primary">
                    絞り込み検索
                </Typography>
            );
            break;
            
        case "contact":
            link1 = (
                <Typography color="text.primary">
                    お問い合わせ
                </Typography>
            );
            break;
        
        case "public_question_index":
            link1 = (
                <Typography color="text.primary">
                    質問一覧
                </Typography>
            );
            break;
        
        case "public_question_create":
            link1 = (
                <Typography color="text.primary">
                    質問投稿
                </Typography>
            );
            break;
        
        case "public_question_show":
            link1 = (
                <Link underline="hover" to="/public/questions/index">
                    質問一覧
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    質問詳細
                </Typography>
            );
            break;
            
        case "public_document_index":
            link1 = (
                <Typography color="text.primary">
                    関連記事一覧
                </Typography>
            );
            break;
        
        
        /* 管理ページ */
        // トップ
        case "mentor_top":
            link1 = (
                <Typography color="text.primary">
                    メンタートップ
                </Typography>
            );
            break;
        
        // 質問
        case "mentor_question_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    質問一覧
                </Typography>
            );
            break;
            
        case "mentor_question_show":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Link underline="hover" to="/questions/index">
                    質問一覧
                </Link>
            );
            link3 =  (
                <Typography color="text.primary">
                    質問詳細
                </Typography>
            );
            break;
            
        case "mentor_question_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    質問投稿
                </Typography>
            );
            break;
            
        case "mentor_question_edit":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Link underline="hover" to="/questions/index">
                    質問一覧
                </Link>
            );
            link3 = (
                <Link underline="hover" to={ `/questions/` + props.id }>
                    質問詳細
                </Link>
            );
            link4 = (
                <Typography color="text.primary">
                    質問編集
                </Typography>
            );
            break;
        
        // 記事
        case "mentor_document_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    記事一覧
                </Typography>
            );
            break;
            
        case "mentor_document_show":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Link underline="hover" to="/documents/index">
                    記事一覧
                </Link>
            );
            link3 =  (
                <Typography color="text.primary">
                    記事詳細
                </Typography>
            );
            break;
            
        case "mentor_document_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    記事投稿
                </Typography>
            );
            break;
            
        case "mentor_document_edit":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Link underline="hover" to="/documents/index">
                    記事一覧
                </Link>
            );
            link3 = (
                <Link underline="hover" to={ `/documents/` + props.id }>
                    記事詳細
                </Link>
            );
            link4 = (
                <Typography color="text.primary">
                    記事編集
                </Typography>
            );
            break;
        
            
        // 紐付け
        case "mentor_link_question_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    質問から紐付け（一覧）
                </Typography>
            );
            break;
        
        case "mentor_link_question_show":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Link underline="hover" to="/links/question/index">
                    質問から紐付け（一覧）
                </Link>
            );
            link3 = (
                <Typography color="text.primary">
                    質問から紐付け（詳細）
                </Typography>
            );
            break;
        
        case "mentor_link_document_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    記事から紐付け（一覧）
                </Typography>
            );
            break;
        
        case "mentor_link_document_show":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Link underline="hover" to="/links/document/index">
                    記事から紐付け（一覧）
                </Link>
            );
            link3 = (
                <Typography color="text.primary">
                    記事から紐付け（詳細）
                </Typography>
            );
            break;
        
        
        // ユーザ
        case "mentor_user_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    ユーザ名簿
                </Typography>
            );
            break;
            
        case "mentor_admin_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    管理者の登録
                </Typography>
            );
            break;
            
        case "mentor_public_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = (
                <Typography color="text.primary">
                    受講生の登録
                </Typography>
            );
            break;
    }
    
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
            <Link underline="hover" to="/">
                HOME
            </Link>
            
            { link1 }
            
            { link2 }
            
            { link3 }
            
            { link4 }
        </Breadcrumbs>
    );
}

export default Breadcrumb;