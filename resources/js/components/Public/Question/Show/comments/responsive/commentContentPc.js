import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styleComment } from "../../../../../Atom/Typography/TypographyStyle";

const commentContentPc = props => {
    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid container spacing={2} justifyContent="left">
                    <Grid item>
                        {props.is_staff ? (
                            <Avatar
                                alt="Mentor"
                                src="/images/images.jpg"
                                sx={{
                                    marginTop: 3,
                                    marginLeft: 3,
                                    float: "left"
                                }}
                            />
                        ) : (
                            <Avatar
                                alt="Student"
                                src="/images/pose_english_shrug_man.png"
                                sx={{
                                    marginTop: 3,
                                    marginLeft: 3
                                }}
                            />
                        )}
                    </Grid>

                    <Grid item sx={{ marginTop: 4 }}>
                        <Typography variant="h7" component="div">
                            {props.is_staff ? "メンター" : "受講生"} &nbsp;
                            {props.created_at}
                        </Typography>
                    </Grid>
                </Grid>

                {(props.user_id === props.target_student ||
                    props.is_admin === "staff") && (
                    <Grid
                        container
                        justifyContent="right"
                        alignItems="center"
                        sx={{ marginTop: 1 }}
                    >
                        <Grid item>
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={() =>
                                    props.setEditId(props.comment_id)
                                }
                            >
                                編集
                            </Button>
                        </Grid>

                        <Grid item>/</Grid>

                        <Grid item>
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={props.deleteConfirm}
                            >
                                削除
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>
            <Typography variant="h6" component="div" sx={styleComment}>
                {props.comment}
            </Typography>
        </Box>
    );
};

export default commentContentPc;
