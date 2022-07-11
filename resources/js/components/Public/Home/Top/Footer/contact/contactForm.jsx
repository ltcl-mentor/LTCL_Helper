import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Category, StyleTextBox, StyleTextField } from "@/Styles/Public/Home/Top/Footer/contact";

const categoryList = ["バグ修正依頼", "就活相談", "その他"];

/**
 * お問い合わせフォーム
 */
const contactForm = ({ input, validation, handleChange }) => {
    return (
        <React.Fragment>
            <StyleTextBox align="left">
                <Category
                    label="お問合せ項目"
                    id="contact-category-select"
                    error={validation.category.error}
                    helperText={validation.category.message}
                    onChange={handleChange}
                    name="category"
                    select
                >
                    {categoryList.map((val, index) => ( <MenuItem value={val} key={index}>{val}</MenuItem> ))}
                </Category>
            </StyleTextBox>

            <StyleTextBox align="center">
                <StyleTextField
                    name="body"
                    label="お問合せ内容"
                    error={validation.body.error}
                    helperText={validation.body.message}
                    multiline
                    rows={8}
                    value={input.body}
                    onChange={handleChange}
                />
            </StyleTextBox>
        </React.Fragment>
    );
};

export default contactForm;
