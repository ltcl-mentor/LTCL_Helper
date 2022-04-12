import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";

const WhiteButton = styled(Button)(({ theme }) => ({
    color: "black",
    fontSize: 18,
    width: "50%",
    boxShadow: "none",
    backgroundColor: "white",
    border: "1px solid black",
    "&:hover": {
        backgroundColor: "#EEEEEE",
        boxShadow: "none",
        color: "black"
    }
}));

export default WhiteButton;
