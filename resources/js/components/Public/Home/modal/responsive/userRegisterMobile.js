import React from "react";

import Typography from "@material-ui/core/Typography";

const styleWarning = {
    color: "red",
    mt: 2,
    mb: 1
};
const styleErrorMessage = {
    color: "red",
    fontSize: "14px"
};
const styleContent = {
    width: "90%",
    margin: "0 auto"
};
const styleSubHeading = {
    fontWeight: "bold",
    color: "#666666",
    fontSize: "18px",
    mt: 2
};

/**
 * userRegisterのPC版
 */
const userRegisterMobile = props => {
    let errorNameMessage;
    if (props.errorName.length > 0) {
        errorNameMessage = (
            <Typography component="div" sx={styleErrorMessage}>
                {props.errorName}
            </Typography>
        );
    }

    let errorPasswordMessage;
    if (props.errorPassword.length > 0) {
        errorPasswordMessage = (
            <Typography component="div" sx={styleErrorMessage}>
                {props.errorPassword}
            </Typography>
        );
    }

    let errorConfirmPasswordMessage;
    if (props.errorConfirmPassword.length > 0) {
        errorConfirmPasswordMessage = (
            <Typography component="div" sx={styleErrorMessage}>
                {props.errorConfirmPassword}
            </Typography>
        );
    }

    return (
        <React.Fragment>
            <Typography align="center" component="div" sx={styleWarning}>
                実名を登録しないでください！
            </Typography>
            <div style={styleContent}>
                <Typography align="left" sx={styleSubHeading}>
                    ユーザー名
                </Typography>
                <input
                    id="name"
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    autoComplete="name"
                    autoFocus
                />
                {errorNameMessage}
                <Typography align="left" sx={styleSubHeading}>
                    パスワード
                </Typography>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    autoComplete="new-password"
                />
                {errorPasswordMessage}
                <Typography align="left" sx={styleSubHeading}>
                    パスワード(確認)
                </Typography>
                <input
                    id="password-confirm"
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    required
                    autoComplete="new-password"
                />
                {errorConfirmPasswordMessage}
            </div>
        </React.Fragment>
    );
};

export default userRegisterMobile;
