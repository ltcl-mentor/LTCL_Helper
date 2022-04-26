import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Box from "@material-ui/core/Box";
import BreakingPoint from "../../../BreakingPoint";
import useMedia from "use-media";

/**
 * 質問表示
 */
function Question(props) {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    const categories = ["カリキュラム", "成果物"];
    const topics = [
        // カリキュラムのトピック
        "AWS",
        "HTML",
        "CSS",
        "JavaScript",
        "サーバー",
        "PHP",
        "Laravel",
        "データベース",
        "Git&GitHub",
        "マイグレーション",
        "リレーション",
        "認証・認可機能(カリキュラム)",
        "API(カリキュラム)",
        "その他(カリキュラム)",
        // 成果物のトピック
        "認証・認可機能(成果物)",
        "API(成果物)",
        "画像処理",
        "Heroku環境",
        "デザイン",
        "その他(成果物)"
    ];
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
        <>
            {isWide ? (
                // 大画面で表示するコンポーネント
                <Box sx={{ width: "90%", marginX: "5%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                alt="Student"
                                src="/images/pose_english_shrug_man.png"
                                sx={{ marginRight: 2 }}
                            />

                            <Typography variant="h7" component="div">
                                受講生 &nbsp; {props.updated_at}
                            </Typography>
                        </Box>

                        <Typography variant="h7" component="div">
                            {categories[props.category]}&nbsp; /&nbsp;
                            {topics[props.topic]}
                            &nbsp; /&nbsp;
                            {props.curriculum_number}&nbsp;
                        </Typography>
                    </Box>

                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            marginTop: 4,
                            fontSize: 30,
                            fontWeight: "bold"
                        }}
                    >
                        {props.title}
                    </Typography>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            marginTop: 3,
                            borderBottom: "1px solid gray",
                            fontWeight: "bold",
                            padding: 1
                        }}
                    >
                        調べたこと
                    </Typography>

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 1,
                            padding: 2,
                            marginBottom: 2
                        }}
                    >
                        {props.remarks}
                    </Typography>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            marginTop: 4,
                            borderBottom: "1px solid gray",
                            fontWeight: "bold",
                            padding: 1
                        }}
                    >
                        試したこと、分からないこと
                    </Typography>

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 1,
                            padding: 2,
                            marginBottom: 2
                        }}
                    >
                        {question}
                    </Typography>
                </Box>
            ) : (
                // スマホで表示するコンポーネント
                <Box sx={{ width: "90%", marginX: "5%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                alt="Student"
                                src="/images/pose_english_shrug_man.png"
                                sx={{
                                    marginRight: 2
                                }}
                            />

                            <Typography variant="h7" component="div">
                                受講生 &nbsp; {props.updated_at}
                            </Typography>
                        </Box>

                        <Typography variant="h7" component="div">
                            {categories[props.category]}&nbsp; /&nbsp;
                            {topics[props.topic]}
                            &nbsp; /&nbsp;
                            {props.curriculum_number}&nbsp;
                        </Typography>
                    </Box>
                    <Box sx={{ display: "fex", position: "relative" }}>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                marginTop: 4,
                                fontSize: 20,
                                fontWeight: "bold"
                            }}
                        >
                            {props.title}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            marginTop: 3,
                            borderBottom: "1px solid gray",
                            fontWeight: "bold",
                            padding: 1,
                            fontSize: 15
                        }}
                    >
                        調べたこと
                    </Typography>

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontSize: 15,
                            padding: 1,
                            marginBottom: 2
                        }}
                    >
                        {props.remarks}
                    </Typography>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            marginTop: 4,
                            borderBottom: "1px solid gray",
                            fontWeight: "bold",
                            padding: 1
                        }}
                    >
                        試したこと、分からないこと
                    </Typography>

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            padding: 1,
                            marginBottom: 2,
                            fontSize: 15
                        }}
                    >
                        {question}
                    </Typography>
                </Box>
            )}
        </>
    );
}

export default Question;
