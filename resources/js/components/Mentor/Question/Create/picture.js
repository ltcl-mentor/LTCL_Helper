import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

function Picture(props) {
    
    return (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" type="file" name="image[]" multiple hidden/>
                <Button variant="contained" component="span">
                    参考画像追加（複数選択可）
                </Button>
            </label>
        </Box>
    );
}

export default Picture;