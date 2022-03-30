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


import Breadcrumbs from '../../Breadcrumbs';


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
    
    // お問い合わせ送信
    const handleSubmit = () => {
        // 問い合わせのバリデーション
        if ((contact.trim().length !== 0) && (category !== "")) {
            if (clickCount === 0) {
                console.log(category+contact);
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
            }
            
            //カテゴリーのバリデーション
            if (category.trim().length === 0) {
                setContactCategoryValidationError(true);
                return false;
            }
        }
    };
    
    // お問い合わせ入力
    const handleContact = (event) => {
        setContact(event.target.value);
    };
    
    // お問合せカテゴリーの変更
    const handleCategory = (event) => {
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
                            marginLeft: 2,
                        }}
                    >
                        お問合せ内容
                    </Typography>
                    
                    <Box>
                    <Box sx={{ marginLeft: '10%',  marginTop: 4 }}>
                        <FormControl>
                            <FormLabel>お問合せカテゴリー</FormLabel>
                            <Select
                                labelId="contact-category-label"
                                id="contact-category-select"
                                onChange={ (event) => handleCategory(event) }
                            >
                                {categoryList.map((val, index) => <MenuItem value={val} key={index}>{val}</MenuItem>)}
                            </Select>
                        </FormControl>
                        { contact_category_validation_error === true && <Typography className="errorMassage" sx={{color: 'red'}}>お問合せカテゴリーを選んでください。</Typography> }
                    </Box>
                    
                    <Box sx={{ textAlign: "center", marginTop: 4 }}>
                        <TextareaAutosize 
                            name="message"
                            placeholder="お問合せ内容を入力してください。"
                            minRows={8}
                            value={ contact }
                            onChange={ (event) => handleContact(event) }
                            style={{ 
                                width: "80%",
                                paddingTop:2,
                            }}
                        />
                        { contact_validation_error === true && <Typography className="errorMassage" sx={{color: 'red'}}>お問合せ内容を入力してください。</Typography> }
                    </Box>
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
