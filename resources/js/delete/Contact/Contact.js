import React,{useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@mui/material/TextField';


import Breadcrumbs from '../../Components/Shared/Breadcrumbs';


/**
 * お問い合わせのメインコンポーネント
 */
function Contact() {
    const history = useHistory();
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
                if (window.confirm('お問合せを送信します。よろしいですか？')) {
                    setClickCount(1);

                    axios
                        .post("/contact", {
                            message: category + contact,
                        })
                        .then(response => {
                            if (response.status === 200) {
                                history.push("/", { type: "contact", status: "created" });
                            }
                        }).catch(error => {
                            console.log(error);
                            setClickCount(0);
                        });
                }
            } else {
                return false;
            }
        } else {
            //本文のバリデーション
            if (contact.trim().length === 0) {
                setContactValidationError(true);
                setValidationMessage('お問合せ内容を入力してください')
            }

            //カテゴリーのバリデーション
            if (category.trim().length === 0) {
                setContactCategoryValidationError(true);
                setCategoryValidationMessage('お問合せ項目を選択してください')
            }
        }
    };

    // お問い合わせ入力
    const handleContact = (event) => {
        if (event.target.value.length === 0) {
            setContactValidationError(true);
            setValidationMessage("お問合せ内容を入力してください")
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
            setCategoryValidationMessage("お問合せ項目を選択してください")
        } else {
            setContactCategoryValidationError(false);
            setCategoryValidationMessage("");
        }
        setCategory('カテゴリー：' + event.target.value + '\n');
    };

    const categoryList = ["バグ修正依頼", "就活相談", "その他"];


    return (
        <div className="container">
            <Breadcrumbs page="contact"/>

            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <Card sx={{ marginBottom: 2 }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginBottom: 4,
                            marginLeft: '10%',
                        }}
                    >
                        お問合せ内容
                    </Typography>
                    <Box>
                        <TextField
                            label="お問合せ項目"
                            select
                            id="contact-category-select"
                            error={ contact_category_validation_error }
                            helperText={ categoryValidationMessage }
                            onChange={ (event) => handleCategory(event) }
                            sx={{width: "30%", marginLeft:"10%"}}
                        >
                            {categoryList.map((val, index) => <MenuItem value={val} key={index}>{val}</MenuItem>)}
                        </TextField>
                    </Box>

                    <Box sx={{ textAlign: "center", marginTop: 4 }}>
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
                                width: "80%",
                                paddingTop:2,
                            }}
                        />
                    </Box>

                    <Typography
                        align="center"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginBottom: 3,
                        }}
                    >
                        <Button onClick={ handleSubmit } variant="contained" endIcon={<SaveIcon />}>
                            送信する
                        </Button>
                    </Typography>
                </Card>
            </Box>
        </div>
    );
}

export default Contact;
