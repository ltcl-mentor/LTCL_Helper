import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";

const ConfirmButton = styled(Button)(({ theme }) => ({
    variant: "outlined",
    color: "#771af8",
    border: "2px solid #771af8",
    fontWeight: "bold",
    minWidth: 150,
    maxWidth: 200,
    marginBottom: 5,
    fontSize: 15,
    "&:hover": {
        backgroundColor: "#771AF8",
        color: "white"
    }
}));

export default ConfirmButton;
