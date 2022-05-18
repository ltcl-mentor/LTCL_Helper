import { styled } from "@mui/material/styles";
import Typography from "@material-ui/core/Typography";

const CodeblockTypography = styled(Typography)(() => ({
    width: "90%",
    marginLeft: "5%",
    marginTop: 1,
    marginBottom: 1,
    padding: 2,
    backgroundColor: "#DDDDDD",
    borderRadius: "3px"
}));

export default CodeblockTypography;
