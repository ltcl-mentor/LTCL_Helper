import React from "react";
import { Link } from '@inertiajs/inertia-react';

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

/**
 * 各ページのパンくずリスト
 */
const breadcrumb = ({ page }) => {
    let link1;
    let link2;
    let link3;
    let link4;
    switch (page) {

        /* 公開部分 */
        case "my_page":
            link1 = <Typography color="text.primary">マイページ</Typography>;
            break;

        case "my_page_question":
            link1 = (
                <Link underline="hover" to="/my_page">
                    マイページ
                </Link>
            );
            link2 = <Typography color="text.primary">質問詳細</Typography>;
            break;

        case "history":
            link1 = (
                <Link underline="hover" to="/my_page">
                    マイページ
                </Link>
            );
            link2 = <Typography color="text.primary">質問閲覧履歴</Typography>;
            break;

        case "contact":
            link1 = <Typography color="text.primary">お問い合わせ</Typography>;
            break;

        case "public_question_index":
            link1 = (
                <Link underline="hover" to="/?page=qa">
                    Q&A
                </Link>
            );
            link2 = <Typography color="text.primary">質問一覧</Typography>;
            break;

        case "public_question_create":
            link1 = <Typography color="text.primary">質問投稿画面</Typography>;
            break;

        case "public_question_show":
            link1 = (
                <Link underline="hover" to="/?page=qa">
                    Q&A
                </Link>
            );
            link2 = (
                <Link underline="hover" to={`/topic/${props.topic}`}>
                    {props.topic_title}
                </Link>
            );
            link3 = <Typography color="text.primary">質問詳細</Typography>;
            break;

        case "public_question_show":
            link1 = (
                <Link underline="hover" to="/public/questions/index">
                    質問一覧
                </Link>
            );
            link2 = <Typography color="text.primary">質問詳細</Typography>;
            break;

        case "public_document_index":
            link1 = <Typography color="text.primary">関連記事一覧</Typography>;
            break;


        /* 管理ページ */
        // トップ
        case "mentor_top":
            link1 = (
                <Typography color="text.primary">メンタートップ</Typography>
            );
            break;

        // 質問
        case "mentor_question_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">質問一覧</Typography>;
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
            link3 = <Typography color="text.primary">質問詳細</Typography>;
            break;

        case "mentor_question_show_mypage":
            link1 = (
                <Link underline="hover" to="/admin_my_page">
                    マイページ
                </Link>
            );
            link2 = <Typography color="text.primary">質問詳細</Typography>;
            break;

        case "mentor_question_show_question":
            link1 = (
                <Link underline="hover" to="/?page=qa">
                    Q&A
                </Link>
            );
            link2 = (
                <Link underline="hover" to={`/topic/${props.topic}`}>
                    {props.topic_title}
                </Link>
            );
            link3 = <Typography color="text.primary">質問詳細</Typography>;
            break;

        case "mentor_question_show_mentor":
            link1 = (
                <Link underline="hover" to="/?page=qa">
                    Q&A
                </Link>
            );
            link2 = (
                <Link underline="hover" to={`/questions/mentor`}>
                    質問一覧
                </Link>
            );
            link3 = <Typography color="text.primary">質問詳細</Typography>;
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
                <Link underline="hover" to={`/questions/` + props.id}>
                    質問詳細
                </Link>
            );
            link4 = <Typography color="text.primary">質問編集</Typography>;
            break;

        // 記事
        case "mentor_document_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">記事一覧</Typography>;
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
            link3 = <Typography color="text.primary">記事詳細</Typography>;
            break;

        case "mentor_document_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">記事投稿</Typography>;
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
                <Link underline="hover" to={`/documents/` + props.id}>
                    記事詳細
                </Link>
            );
            link4 = <Typography color="text.primary">記事編集</Typography>;
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
            link2 = <Typography color="text.primary">ユーザ名簿</Typography>;
            break;

        case "mentor_admin_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">管理者の登録</Typography>;
            break;

        case "mentor_public_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">受講生の登録</Typography>;
            break;

        case "mentor_event_index":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">イベント一覧</Typography>;
            break;

        case "mentor_event_create":
            link1 = (
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
            );
            link2 = <Typography color="text.primary">イベント作成</Typography>;
            break;


        case "notFound":
            link1 = (
                <Typography color="text.primary">
                    ページが見つかりません
                </Typography>
            );
    }

    return (
        <Breadcrumbs sx={{ marginBottom: 4, fontSize: "20px" }}>
            <Link href={route('home')}>Top</Link>

            {link1}
            {link2}
            {link3}
            {link4}
        </Breadcrumbs>
    );
};

export default breadcrumb;
