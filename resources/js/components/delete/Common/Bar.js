import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import useMedia from "use-media";
import BreakingPoint from "../../../Styles/BreakingPoint";

import AppBar from "@material-ui/core/AppBar";
import Button from "@mui/material/Button";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Links from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import User from "../../Common/userIcon";
import { LoginUser } from "../../Route.js";

// 各パーツのスタイル設定
const styleFlexGrow = { flexGrow: 1 };
const styleContent = { pb: 2 };
const styleHover = { "&:hover": { color: "#771AF8" } };
const styleAppBar = {
    boxShadow: "none",
    backgroundColor: "white"
};
const styleLogoLink = {
    color: "#808080",
    fontSize: "25px",
    "&:hover": { color: "#771AF8" }
};
const styleLogoImage = {
    mt: "5px",
    width: "165px",
    height: "50px"
};
const styleSearchButton = {
    backgroundColor: "#771AF8",
    borderRadius: 0,
    padding: "6px 20px",
    boxShadow: "none",
    "&:hover": {
        backgroundColor: "#6633CC",
        boxShadow: "none"
    }
};

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
 * メニューバーのメインコンポーネント
 */
const Bar = () => {
    const history = useHistory();
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    // ログインユーザー情報取得
    const user = useContext(LoginUser);

    let userIcon;
    if (user.id) {
        userIcon = <User user={user} isWide={isWide} />;
    } else {
        userIcon = (
            <div>
                <Links className="navbar-brand" href="/login" underline="none">
                    Login
                </Links>
            </div>
        );
    }

    // 検索画面へ
    const toSearch = () => {
        history.push("/?page=qa");
    };

    let responsive;
    if (isWide) {
        responsive = (
            <React.Fragment>
                <Button
                    variant="contained"
                    sx={styleSearchButton}
                    onClick={() => toSearch()}
                >
                    検索する
                </Button>
                <QuestionTooltip
                    title={<Typography color="inherit">質問する</Typography>}
                >
                    <IconButton
                        sx={styleHover}
                        size="large"
                        component={Link}
                        to={"/public/questions/create"}
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </QuestionTooltip>
            </React.Fragment>
        );
    }

    return (
        <Box sx={{ ...styleContent, ...styleFlexGrow }}>
            <AppBar position="static" color="default" sx={styleAppBar}>
                <Toolbar>
                    <Typography component="div" sx={styleFlexGrow}>
                        <Links sx={styleLogoLink} href="/" underline="none">
                            <img
                                src={`images/helper_logo.png?ver=${new Date().getTime()}`}
                                style={styleLogoImage}
                            />
                        </Links>
                    </Typography>

                    {userIcon}

                    {responsive}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Bar;
