import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ConfirmButton from "../../../Atom/Button/ConfirmButton";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    py: 4,
    px: 20,
    m: 4
};

const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 14
};

const addRelatedQuestion = React.memo(props => {
    const history = useHistory();
    const [isClicked, setIsClicked] = useState(0);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [beginner, setBeginner] = useState(false);
    const [amature, setAmature] = useState(false);
    const [master, setMaster] = useState(false);
    const [all, setAll] = useState(false);

    const handleChangeBeginner = () => {
        setBeginner(!beginner);
        setAll(false);
    };
    const handleChangeAmature = () => {
        setAmature(!amature);
        setAll(false);
    };
    const handleChangeMaster = () => {
        setMaster(!master);
        setAll(false);
    };
    const handleChangeAll = () => {
        setAll(!all);
        setBeginner(false);
        setAmature(false);
        setMaster(false);
    };

    const handleSubmit = () => {
        setIsClicked(1);
        props.handleOpen();
        if (isClicked === 0) {
            axios
                .post("/documents/store", {
                    title: title,
                    link: link,
                    targets: {
                        beginner: beginner,
                        amature: amature,
                        master: master,
                        all: all
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        axios
                            .post(`/link/question/${props.question_id}`, {
                                document_id: response.data.id
                            })
                            .then(response => {
                                console.log(response.data.text);
                            });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <Modal open={props.open} onClose={props.handleOpen}>
                <Box sx={style}>
                    <IconButton
                        variant="text"
                        sx={{
                            color: "red",
                            position: "absolute",
                            right: 5,
                            top: 5
                        }}
                        onClick={props.handleOpen}
                    >
                        <CancelIcon />
                    </IconButton>

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
                            onChange={e => setTitle(e.target.value)}
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
                            onChange={e => setLink(e.target.value)}
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
                                checked={beginner}
                                onChange={handleChangeBeginner}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="中級者"
                                sx={{ px: 1 }}
                                checked={amature}
                                onChange={handleChangeAmature}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="上級者"
                                sx={{ px: 1 }}
                                checked={master}
                                onChange={handleChangeMaster}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="全員必読"
                                sx={{ px: 1 }}
                                checked={all}
                                onChange={handleChangeAll}
                            />
                        </FormGroup>
                    </Box>
                    <Box sx={{ my: 5, textAlign: "center" }}>
                        <ConfirmButton onClick={handleSubmit}>
                            登録する
                        </ConfirmButton>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
});

export default addRelatedQuestion;
