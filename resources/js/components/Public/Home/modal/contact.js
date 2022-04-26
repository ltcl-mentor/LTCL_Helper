import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from '@mui/material/Modal';

/**
 * お問い合わせ
 */
const Contact = (props) => {
    const history = useHistory();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [contact, setContact] = useState('');
    const [category, setCategory] = useState('');
    const [contact_validation_error, setContactValidationError] = useState(false);
    const [contact_category_validation_error, setContactCategoryValidationError] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [categoryValidationMessage, setCategoryValidationMessage] = useState('');
    
    // お問い合わせ送信
    const handleSubmit = () => {
        // 問い合わせのバリデーション
        if ((contact.trim().length !== 0) && (category !== "")) {
            if (clickCount === 0) {
                setClickCount(1);
                
                axios
                    .post("/contact", {
                        message: category + contact,
                    })
                    .then(response => {
                        if (response.status === 200) {
                            setClickCount(0);
                            setConfirmOpen(false);
                            props.onClose();
                            history.push("/", { type: "contact", status: "created" });
                        }
                    }).catch(error => {
                        console.log(error);
                        setClickCount(0);
                    });
            } else {
                return false;
            }
        } else {
            //本文のバリデーション
            if (contact.trim().length === 0) {
                setContactValidationError(true);
                setValidationMessage('お問合せ内容を入力してください');
            }
            
            //カテゴリーのバリデーション
            if (category.trim().length === 0) {
                setContactCategoryValidationError(true);
                setCategoryValidationMessage('お問合せ項目を選択してください');
            }
        }
    };
    
    // お問い合わせ入力
    const handleContact = (event) => {
        if (event.target.value.length === 0) {
            setContactValidationError(true);
            setValidationMessage("お問合せ内容を入力してください");
        } else {
            setContactValidationError(false);
            setValidationMessage("");
        }
        setContact(event.target.value);
    };
    
    // お問合せカテゴリーの変更
    const handleCategory = (event) => {
        if (event.target.value.length === 0) {
            setContactCategoryValidationError(true);
            setCategoryValidationMessage("お問合せ項目を選択してください");
        } else {
            setContactCategoryValidationError(false);
            setCategoryValidationMessage("");
        }
        setCategory('カテゴリー：' + event.target.value + '\n');
    };
    
    const categoryList = ["バグ修正依頼", "就活相談", "その他"];
    
    return (
        <React.Fragment>
            <IconButton onClick={() => props.onClose()} sx={{ color: 'red', ml: '95%' }}>
                <HighlightOffIcon />
            </IconButton>
            
            <Box sx={{ width: "90%", m: '0 auto' }}>
                <Typography
                    align="center"
                    component="div"
                    sx={{ color: "#771AF8", fontSize: "24px", fontWeight: "bold" }}
                >
                    お問い合わせ
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="お問合せ項目"
                        select
                        id="contact-category-select"
                        error={ contact_category_validation_error }
                        helperText={ categoryValidationMessage }
                        onChange={ (event) => handleCategory(event) }
                        sx={{ width: props.isWide ? "30%" : '100%', ml: props.isWide && '10%' }}
                    >
                        {categoryList.map((val, index) => <MenuItem value={val} key={index}>{val}</MenuItem>)}
                    </TextField>
                </Box>
                
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <TextField
                        name="message"
                        label="お問合せ内容"
                        error={ contact_validation_error }
                        helperText={ validationMessage }
                        multiline
                        rows={8}
                        value={ contact }
                        onChange={ (event) => handleContact(event) }
                        style={{ 
                            width: props.isWide ? "80%" : '100%',
                            paddingTop:2,
                        }}
                    />
                </Box>
                
                <Typography align="center" component="div" sx={{ marginTop: 4, marginBottom: 3 }}>
                    <Button
                        onClick={() => setConfirmOpen(true)}
                        variant="outlined"
                        sx={{
                            color: '#771AF8',
                            border: '1px solid #771AF8',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: '#771AF8',
                                border: '1px solid #771AF8',
                            }
                        }}
                    >
                        送信する
                    </Button>
                </Typography>
            </Box>
            
            {/* 確認モーダル */}
            <Modal
                open={confirmOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box 
                    sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: props.isWide ? '50%' : '90%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <IconButton onClick={() => setConfirmOpen(false)} sx={{ color: 'red', ml: '95%' }}>
                        <HighlightOffIcon />
                    </IconButton>
                    <Typography align="center" sx={{ fontSize: '20px', mt: '10px' }}>
                        お問い合わせを送信します。<br/>よろしいですか？
                    </Typography>
                    <Typography align="center" sx={{ mt: '20px' }}>
                        <Button
                        onClick={() => handleSubmit()}
                        variant="outlined"
                        sx={{
                            color: '#771AF8',
                            border: '1px solid #771AF8',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: '#771AF8',
                                border: '1px solid #771AF8',
                            }
                        }}
                    >
                        送信する
                    </Button>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default Contact;