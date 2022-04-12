import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";

const PurpleButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontSize: 18,
    width: "50%",
    boxShadow: "none",
    backgroundColor: "#771AF8",
    border: "1px solid black",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#6633CC",
        boxShadow: "none",
        color: "white"
    }
}));

export default PurpleButton;
