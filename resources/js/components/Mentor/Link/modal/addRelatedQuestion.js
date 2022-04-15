import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ConfirmButton from "../../../Atom/Button/ConfirmButton";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    py: 4,
    px: 15,
    m: 4
};

const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 14
};

const addRelatedQuestion = props => {
    return (
        <div>
            <Modal open={props.open} onClose={props.handleOpen}>
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 3,
                            fontWeight: "bold",
                            padding: 1,
                            color: "#771AF8",
                            margin: "0 auto",
                            textAlign: "center"
                        }}
                    >
                        関連記事の登録
                    </Typography>
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 20,
                                mt: 4,
                                color: "#707070",
                                mb: 1
                            }}
                        >
                            タイトル
                        </Typography>
                        <TextField
                            label="記事のタイトルを入力"
                            variant="outlined"
                            fullWidth
                        />
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 20,
                                mt: 4,
                                color: "#707070",
                                mb: 1
                            }}
                        >
                            記事URL
                            <span style={styleSpan}>
                                NotePMの外部共有URLのみ使用可能
                            </span>
                        </Typography>
                        <TextField
                            label="記事のURLを入力"
                            variant="outlined"
                            fullWidth
                        />
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 20,
                                mt: 4,
                                color: "#707070",
                                mb: 1
                            }}
                        >
                            対象者
                            <span style={styleSpan}>複数選択可</span>
                        </Typography>
                    </Box>

                    <Box>
                        <FormGroup
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                ml: "15%"
                            }}
                        >
                            <FormControlLabel
                                sx={{ px: 1 }}
                                control={<Checkbox />}
                                label="初心者"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="中級者"
                                sx={{ px: 1 }}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="上級者"
                                sx={{ px: 1 }}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="全員必読"
                                sx={{ px: 1 }}
                            />
                        </FormGroup>
                    </Box>
                    <Box sx={{ my: 5, textAlign: "center" }}>
                        <ConfirmButton>登録する</ConfirmButton>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default addRelatedQuestion;
