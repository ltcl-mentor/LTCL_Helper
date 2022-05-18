import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styleMobileComment } from "../../../../../Atom/Typography/TypographyStyle";

const commentContentMobile = props => {
    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                {props.is_staff ? (
                    <Avatar
                        alt="Mentor"
                        src="/images/images.jpg"
                        sx={{ mr: 1 }}
                    />
                ) : (
                    <Avatar
                        alt="Student"
                        src="/images/pose_english_shrug_man.png"
                        sx={{ mr: 1 }}
                    />
                )}

                <Typography variant="h7" component="div">
                    {props.is_staff ? "メンター" : "受講生"}
                    &nbsp;
                    {props.created_at}
                </Typography>

                {(props.user_id === props.target_student ||
                    props.is_admin === "staff") && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={() => props.setEditId(props.comment_id)}
                        >
                            編集
                        </Button>
                        /
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={props.deleteConfirm}
                        >
                            削除
                        </Button>
                    </Box>
                )}
            </Box>
            <Typography variant="h6" component="div" sx={styleMobileComment}>
                {props.comment}
            </Typography>
        </Box>
    );
};

export default commentContentMobile;
