import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@material-ui/core/Typography";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import ConfirmButton from "../../../Atom/Button/ConfirmButton";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import AlertMessage from "../../../Alert";
import BreakingPoint from "../../../BreakingPoint";
import useMedia from "use-media";

const styleForPc = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4
};

const styleForPhone = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 14
};

const addRelatedQuestion = React.memo(props => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [beginner, setBeginner] = useState(false);
    const [amature, setAmature] = useState(false);
    const [master, setMaster] = useState(false);
    const [all, setAll] = useState(false);

    const [textValidationError, setTextValidationError] = useState({
        title: false,
        link: false,
        target: false
    });
    const [
        textValidationErrorMessage,
        setTextValidationErrorMessage
    ] = useState({ title: "", link: "" });

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

    const handleValidate = () => {
        let validateKey = {
            title: false,
            link: false,
            target: false
        };
        let validateMessage = {
            title: "",
            link: ""
        };

        if (title.trim().length === 0) {
            validateKey.title = true;
            validateMessage.title = "???????????????????????????????????????";
        }
        if (link.trim().length === 0) {
            validateKey.link = true;
            validateMessage.link = "URL???????????????????????????";
        }
        if (
            beginner === false &&
            amature === false &&
            master === false &&
            all === false
        ) {
            validateKey.target = true;
        }

        setTextValidationError(validateKey);
        setTextValidationErrorMessage(validateMessage);

        if (
            validateKey.title === false &&
            validateKey.link === false &&
            validateKey.target === false
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = () => {
        const error_check = handleValidate();

        if (error_check === true) {
            props.handleOpen();

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
        <>
            {isWide ? (
                // ????????????????????????????????????
                <Modal open={props.open} onClose={props.handleOpen}>
                    <Box sx={styleForPc}>
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
                            ?????????????????????
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
                                ????????????
                            </Typography>
                            <TextField
                                error={textValidationError["title"]}
                                helperText={textValidationErrorMessage["title"]}
                                label="??????????????????????????????"
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
                                ??????URL
                                <span style={styleSpan}>
                                    NotePM???????????????URL??????????????????
                                </span>
                            </Typography>
                            <TextField
                                error={textValidationError["link"]}
                                helperText={textValidationErrorMessage["link"]}
                                label="?????????URL?????????"
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
                                ?????????
                                <span style={styleSpan}>???????????????</span>
                            </Typography>
                        </Box>
                        <Box>
                            <FormControl error={textValidationError["target"]}>
                                <FormGroup
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}
                                >
                                    <FormControlLabel
                                        sx={{ px: 1 }}
                                        control={<Checkbox />}
                                        label="?????????"
                                        checked={beginner}
                                        onChange={handleChangeBeginner}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="?????????"
                                        sx={{ px: 1 }}
                                        checked={amature}
                                        onChange={handleChangeAmature}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="?????????"
                                        sx={{ px: 1 }}
                                        checked={master}
                                        onChange={handleChangeMaster}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="????????????"
                                        sx={{ px: 1 }}
                                        checked={all}
                                        onChange={handleChangeAll}
                                    />
                                    {textValidationError.target ? (
                                        <FormHelperText>
                                            ????????????????????????????????????
                                        </FormHelperText>
                                    ) : null}
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 5, textAlign: "center" }}>
                            <ConfirmButton onClick={handleSubmit}>
                                ????????????
                            </ConfirmButton>
                        </Box>
                    </Box>
                </Modal>
            ) : (
                // ????????????????????????????????????
                <Modal open={props.open} onClose={props.handleOpen}>
                    <Box sx={styleForPhone}>
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
                            ?????????????????????
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
                                ????????????
                            </Typography>
                            <TextField
                                error={textValidationError["title"]}
                                helperText={textValidationErrorMessage["title"]}
                                label="??????????????????????????????"
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
                                ??????URL
                                <span style={styleSpan}>
                                    NotePM???????????????URL??????????????????
                                </span>
                            </Typography>
                            <TextField
                                error={textValidationError["link"]}
                                helperText={textValidationErrorMessage["link"]}
                                label="?????????URL?????????"
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
                                ?????????
                                <span style={styleSpan}>???????????????</span>
                            </Typography>
                        </Box>
                        <Box>
                            <FormControl error={textValidationError["target"]}>
                                <FormGroup
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}
                                >
                                    <FormControlLabel
                                        sx={{ px: 1 }}
                                        control={<Checkbox />}
                                        label="?????????"
                                        checked={beginner}
                                        onChange={handleChangeBeginner}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="?????????"
                                        sx={{ px: 1 }}
                                        checked={amature}
                                        onChange={handleChangeAmature}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="?????????"
                                        sx={{ px: 1 }}
                                        checked={master}
                                        onChange={handleChangeMaster}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="????????????"
                                        sx={{ px: 1 }}
                                        checked={all}
                                        onChange={handleChangeAll}
                                    />
                                    {textValidationError.target ? (
                                        <FormHelperText>
                                            ????????????????????????????????????
                                        </FormHelperText>
                                    ) : null}
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 5, textAlign: "center" }}>
                            <ConfirmButton onClick={handleSubmit}>
                                ????????????
                            </ConfirmButton>
                        </Box>
                    </Box>
                </Modal>
            )}
        </>
    );
});

export default addRelatedQuestion;
