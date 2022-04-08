import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from "@mui/material/styles";

/**
 * 質問の詳細情報
 */

const PurpleCell = styled(TableCell)(({ theme }) => ({
    color: "white",
    width: "35%",
    fontSize: 18,
    backgroundColor: "#b599f2",
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: "2%"
}));

const GrayCell = styled(TableCell)(({ theme }) => ({
    color: "black",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
    paddingLeft: "2%"
}));

function Parameters(props) {
    const categories = ["カリキュラム", "成果物"];
    const topics = [
        // カリキュラム
        "AWS",
        "HTML",
        "CSS",
        "JavaScript",
        "サーバー",
        "PHP",
        "Laravel",
        "DB",
        "Git&GitHub",
        "マイグレーション",
        "リレーション",
        "認証・認可機能(カリキュラム)",
        "API(カリキュラム)",
        "その他(カリキュラム)",
        // 成果物
        "認証・認可機能(成果物)",
        "API(成果物)",
        "画像処理",
        "Heroku環境",
        "デザイン",
        "その他(成果物)"
    ];

    return (
        <Paper sx={{ marginBottom: 2 }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            カテゴリー
                        </PurpleCell>
                        <GrayCell align="center">
                            {categories[props.category]}
                        </GrayCell>
                    </TableRow>

                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            トピック
                        </PurpleCell>
                        <GrayCell align="center">
                            {topics[props.topic]}
                        </GrayCell>
                    </TableRow>

                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            カリキュラム番号
                        </PurpleCell>
                        <GrayCell align="center">
                            {props.curriculum_number}
                        </GrayCell>
                    </TableRow>

                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            質問タイトル
                        </PurpleCell>
                        <GrayCell align="center">{props.title}</GrayCell>
                    </TableRow>

                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            調べたこと
                        </PurpleCell>
                        <GrayCell align="center">{props.remarks}</GrayCell>
                    </TableRow>

                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            具体的な内容
                        </PurpleCell>
                        <GrayCell align="center">{props.question}</GrayCell>
                    </TableRow>

                    <TableRow>
                        <PurpleCell align="center" component="th" scope="row">
                            画像挿入
                        </PurpleCell>
                        <GrayCell align="center">
                            {props.images.length === 0 ? (
                                "なし"
                            ) : (
                                <img src={props.images[0]} />
                            )}
                        </GrayCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Parameters;
