import React from 'react';
import {Link} from 'react-router-dom';

function Top() {
    return (
        <div class="container">
            <h1 class="mentor_question_title">質問</h1>
            <div class="mentor_btns">
                <Link to="/questions/index"><button class="mentor_btn question_btns">一覧</button></Link>
                <Link to="/questions/create"><button class="mentor_btn question_btns">新規登録</button></Link>
            </div>
        
            <h1 class="mentor_document_title">関連記事</h1>
            <div class="mentor_btns">
                <Link to="/documents/index"><button class="mentor_btn document_btn">一覧</button></Link>
                <Link to="/documents/create"><button class="mentor_btn document_btn">新規登録</button></Link>
            </div>
        
            <h1 class="mentor_document_title">記事と質問の紐付け</h1>
            <div class="mentor_btns">
                <a href="/links/index"><button class="mentor_btn links_btn">一覧</button></a>
            </div>
        
            <h1 class="mentor_list_title">名簿</h1>
            <div class="mentor_btns">
                <a href="/users/index"><button class="mentor_btn list_btn">一覧</button></a>
                <a href="/users/admin/register"><button class="mentor_btn list_btn">管理者の登録</button></a>
                <a href="/users/public/register"><button class="mentor_btn list_btn">受講生の登録</button></a>
            </div>
        </div>
    );
}

export default Top;