import React from "react";
import { Link } from '@inertiajs/inertia-react';
import { useQA } from "@/Logics/Home/QA/QA";
import SearchArea from "./Search/searchArea";
import IndexQuestionArticle from "./Index/indexQuestionArticle";
import { Achievment } from "@/Styles/Public/Home/QA/QA";

/**
 * Q&A画面
 */
const QA = ({ user }) => {
    const [{ achievement }] = useQA();

    return (
        <React.Fragment>
            {user.is_admin == "staff" &&
                <Achievment>
                    <Link href={route('home')}>
                        現在の質問解決率：<font color="purple">{achievement}</font>%
                    </Link>
                </Achievment>
            }

            {/* 検索部分 */}
            <SearchArea />

            {/* 質問・記事一覧 */}
            <IndexQuestionArticle />
        </React.Fragment>
    );
};

export default QA;
