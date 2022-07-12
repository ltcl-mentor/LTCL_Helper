import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const QuestionTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "white",
        color: "rgba(0, 0, 0, 0.87)",
        width: 85,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9"
    }
}));

/**
 * ヘッダー右上質問ボタン
 */
const questionButton = () => {
    return (
        <QuestionTooltip
            title={<Typography color="inherit">質問する</Typography>}
        >
            <IconButton size="large">
                <Link href={route("question.create")}>
                    <AddIcon fontSize="inherit" />
                </Link>
            </IconButton>
        </QuestionTooltip>
    );
}

export default questionButton;
