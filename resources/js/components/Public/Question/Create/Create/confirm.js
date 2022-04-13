import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Parameters from "../../Show/parameters";
import ConfirmButton from "../../../../Atom/Button/ConfirmButton";

/**
 * 質問登録前の確認フォーム
 */

const QuestionConfirm = props => {
    let question = [];
    if (props.question) {
        // 最後の文が認識されないのを防止する
        const text = props.question + "\n";

        /**
         * step1 画像が含まれているか判別
         */

        // 画像が含まれていた場合は画像部分と文章部分を分割してstep1_fragmentsに格納
        let step1_fragments = [];

        // 画像が含まれていた場合
        if (text.indexOf("<image link=") !== -1) {
            // "<image link="という文字列で配列に分割
            let semi_fragments = text.split(/(?=<image link=)/g);

            // 画像部分を抽出
            semi_fragments.forEach(semi_fragment => {
                // "//>"という文字列があれば配列に分割して、なければそのままstep1_fragmentsに格納
                if (semi_fragment.indexOf("//>")) {
                    let fragments = semi_fragment.split("//>");

                    fragments.map(fragment => {
                        step1_fragments.push(fragment);
                    });
                } else {
                    step1_fragments.push(semi_fragment);
                }
            });
        } else {
            step1_fragments.push(text);
        }

        step1_fragments.map(fragment => {
            /**
             * step2 画像表示
             */

            // fragmentが画像の部分だった場合
            if (fragment.indexOf("<image link=") !== -1) {
                // 画像部分か判別するためにfragmentの冒頭につけている"<image link="の部分を削除し、画像のURLを取得
                let image_url = fragment.slice(12);

                question.push(
                    <a href={image_url} data-lightbox="group">
                        <img src={image_url} height={200} width={200} />
                    </a>
                );

                // fragmentが文章だった場合
            } else {
                // コードブロックがある場合
                if (fragment.indexOf("```\n") !== -1) {
                    // " ```\n（改行） "の記号で文章全体を分割
                    // 以下分割した文章を”block（ブロック）”と呼称
                    const blocks = fragment.split("```\n");

                    blocks.forEach((block_content, block_number) => {
                        // ブロックに"\n（改行）"があった場合
                        if (blocks[block_number].indexOf("\n") !== -1) {
                            // ブロックを”\n（改行）”で分割
                            // 以下分割した各文を"paragraph（パラグラフ）"と呼称
                            const paragraphs = blocks[block_number].split("\n");

                            paragraphs.forEach(
                                (paragraph_content, paragraph_number) => {
                                    // パラグラフの先頭に"* （アスタリスクとスペース）"の記号が含まれてた場合
                                    if (
                                        paragraphs[paragraph_number].slice(
                                            0,
                                            2
                                        ) === "* "
                                    ) {
                                        // パラグラフの先頭の"* "を"・"に置き換え
                                        paragraphs[paragraph_number] =
                                            "・" + paragraph_content.slice(2);
                                    }
                                }
                            );

                            // 箇条書きのために分解したブロックを再構成
                            // "\n"で連結
                            blocks[block_number] = paragraphs.join("\n");
                        }
                    });

                    // 表示内容の設定
                    question.push(
                        blocks.map((block, block_number) => {
                            // コードブロック以外
                            if (block_number % 2 === 0) {
                                return <div key={block_number}>{block}</div>;

                                // コードブロック
                            } else {
                                return (
                                    <Typography
                                        key={block_number}
                                        component="div"
                                        sx={{
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: 1,
                                            marginBottom: 1,
                                            padding: 2,
                                            backgroundColor: "#DDDDDD",
                                            borderRadius: "3px"
                                        }}
                                    >
                                        {block}
                                    </Typography>
                                );
                            }
                        })
                    );

                    // コードブロックがなく箇条書きがある場合
                } else if (fragment.indexOf("\n") !== -1) {
                    // ブロックを”\n（改行）”で分割
                    // 以下分割した各文を"paragraph（パラグラフ）"と呼称
                    const paragraphs = fragment.split("\n");

                    paragraphs.forEach(
                        (paragraph_content, paragraph_number) => {
                            // パラグラフの先頭に"* （アスタリスクとスペース）"の記号が含まれてた場合
                            if (
                                paragraphs[paragraph_number].slice(0, 2) ===
                                "* "
                            ) {
                                // パラグラフの先頭の"* "を"・"に置き換え
                                paragraphs[paragraph_number] =
                                    "・" + paragraph_content.slice(2);
                            }
                        }
                    );

                    // 表示内容の設定
                    // パラグラフは元々改行で区切られていた文章なのでdivタグにそのまま挿入
                    question.push(
                        paragraphs.map((paragraph, paragraph_number) => {
                            return (
                                <div key={paragraph_number}>{paragraph}</div>
                            );
                        })
                    );

                    // 特にデザインがない場合
                } else {
                    // 表示内容の設定
                    // 入力内容をそのまま挿入
                    question.push(<div>{fragment}</div>);
                }
            }
        });
    }

    return (
        <div calssName="container">
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginBottom: 5,
                    fontSize: 30,
                    color: "#771af8",
                    fontWeight: "bold"
                }}
            >
                確認画面
            </Typography>
            <Parameters
                category={props.category}
                topic={props.topic}
                curriculum_number={props.curriculum_number}
                title={props.title}
                remarks={props.remarks}
                question={props.question}
                images={props.images}
            />

            <div style={{ textAlign: "center", marginTop: 50 }}>
                <ConfirmButton onClick={props.handleSubmit}>
                    投稿する
                </ConfirmButton>
            </div>
            <div
                style={{
                    textAlign: "center",
                    marginTop: 5,
                    marginBottom: 30
                }}
            >
                <Button
                    variant="text"
                    onClick={props.handleConfirmPage}
                    style={{
                        color: "black",
                        minWidth: 150,
                        maxWidth: 200,
                        marginBottom: 5
                    }}
                >
                    入力画面に戻る
                </Button>
            </div>
        </div>
    );
};

export default QuestionConfirm;
