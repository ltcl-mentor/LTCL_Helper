import React, { useState } from "react";
import Box from "@mui/material/Box";
import SelectForm from "./selectForm";

/**
 * 質問編集のメインコンポーネント
 */
const Edit = () => {
    const [screen_width, setScreenWidth] = useState(window.innerWidth);

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: screen_width >= 800 ? "90%" : "96%",
                    marginLeft: screen_width >= 800 ? "5%" : "2%",
                    marginRight: screen_width >= 800 ? "5%" : "2%"
                }}
            >
                <SelectForm />
            </Box>
        </React.Fragment>
    );
};

export default Edit;
