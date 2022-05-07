import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

/**
 * 紐付け処理
 */
function Link(props) {
    const [checked, setChecked] = useState([]);
    const [related_documents, setRelatedDocuments] = useState([]);
    const [default_related_documents, setDefaultRelatedDocuments] = useState(
        []
    );
    const [unrelated_documents, setUnrelatedDocuments] = useState([]);
    const [
        default_unrelated_documents,
        setDefaultUnrelatedDocuments
    ] = useState([]);
    const upChecked = intersection(checked, related_documents);
    const downChecked = intersection(checked, unrelated_documents);
    const [expanded, setExpanded] = useState(false);
    const [whitchAccordion, setWhitchAccordion] = useState("");

    // 画面描画時に実行
    useEffect(() => {
        // 関連質問一覧取得
        axios
            .get(`/react/documents/${props.id}`)
            .then(response => {
                setRelatedDocuments(response.data.related_documents);
                setUnrelatedDocuments(response.data.unrelated_documents);
                setDefaultRelatedDocuments(response.data.related_documents);
                setDefaultUnrelatedDocuments(response.data.unrelated_documents);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 紐付け登録と解除の要素切り替え
    useEffect(() => {
        let attach_id = [];
        let detach_id = [];

        related_documents.map(question => {
            attach_id.push(question.id);
        });
        unrelated_documents.map(question => {
            detach_id.push(question.id);
        });

        props.setAttachId(attach_id);
        props.setDetachId(detach_id);
    }, [related_documents, unrelated_documents]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleAllDown = () => {
        setUnrelatedDocuments(unrelated_documents.concat(related_documents));
        setRelatedDocuments([]);
    };

    const handleCheckedDown = () => {
        setUnrelatedDocuments(unrelated_documents.concat(upChecked));
        setRelatedDocuments(not(related_documents, upChecked));
        setChecked(not(checked, upChecked));
    };

    const handleCheckedUp = () => {
        setRelatedDocuments(related_documents.concat(downChecked));
        setUnrelatedDocuments(not(unrelated_documents, downChecked));
        setChecked(not(checked, downChecked));
    };

    const handleAllUp = () => {
        setRelatedDocuments(related_documents.concat(unrelated_documents));
        setUnrelatedDocuments([]);
    };

    const handleChange = (panel, upOrDown) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setWhitchAccordion(upOrDown);
    };

    const handleReset = () => {
        setRelatedDocuments(default_related_documents);
        setUnrelatedDocuments(default_unrelated_documents);
    };

    const customList = (documents, upOrDown) => (
        <Paper
            sx={{
                width: "90%",
                height: 500,
                overflow: "auto",
                marginLeft: "5%",
                marginBottom: 1
            }}
        >
            <Typography
                variant="h6"
                align="center"
                component="div"
                sx={{
                    marginTop: 2,
                    marginBottom: 2
                }}
            >
                {upOrDown === "up" ? "関連記事に設定中" : "関連記事に未設定"}
            </Typography>

            {props.staffs.map(staff => {
                return (
                    <Accordion
                        expanded={
                            expanded === staff.id &&
                            upOrDown === whitchAccordion
                        }
                        onChange={handleChange(staff.id, upOrDown)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                {staff.name}
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                {
                                    documents.filter(
                                        document => document.user_id == staff.id
                                    ).length
                                }
                                件
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense component="div" role="list">
                                {documents.map(document => {
                                    const labelId = `transfer-list-item-${document.id}-label`;

                                    if (document.user_id === staff.id) {
                                        return (
                                            <ListItem
                                                key={document.id}
                                                role="listitem"
                                                button
                                                onClick={handleToggle(document)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        checked={
                                                            checked.indexOf(
                                                                document
                                                            ) !== -1
                                                        }
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{
                                                            "aria-labelledby": labelId
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={document.title}
                                                />
                                            </ListItem>
                                        );
                                    }
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Paper>
    );

    return (
        <Box sx={{ marginTop: 4 }}>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{ width: "100%" }}>
                    {customList(related_documents, "up")}
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item sx={{ width: "100%" }}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllDown}
                                        disabled={
                                            related_documents.length === 0
                                        }
                                        aria-label="move all right"
                                    >
                                        <ArrowDownwardIcon />
                                        全移動
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedDown}
                                        disabled={upChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        <KeyboardArrowDownIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="contained"
                                onClick={handleReset}
                                disabled={
                                    default_related_documents ===
                                        related_documents &&
                                    default_unrelated_documents ===
                                        unrelated_documents
                                }
                                aria-label="reset"
                            >
                                リセットする
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="contained"
                                onClick={handleReset}
                                aria-label="reset"
                                disabled={
                                    !(
                                        upChecked.length === 0 &&
                                        downChecked.length === 0
                                    )
                                }
                                onClick={props.handleSubmit}
                                startIcon={<SaveIcon />}
                            >
                                設定する
                            </Button>
                        </Grid>

                        <Grid item sx={{ width: "100%" }}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedUp}
                                        disabled={downChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        <KeyboardArrowUpIcon />
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllUp}
                                        disabled={
                                            unrelated_documents.length === 0
                                        }
                                        aria-label="move all left"
                                    >
                                        <ArrowUpwardIcon />
                                        全移動
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%", marginBottom: 5 }}>
                    {customList(unrelated_documents, "down")}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Link;
