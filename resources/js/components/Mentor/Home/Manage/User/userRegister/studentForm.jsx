import React from 'react';
import { useRegister } from '@/Logics/Mentor/Home/Manage/User/userRegister/userRegister';
import TextField from '@mui/material/TextField';
import Select from './studentForm/select';
import { SubmitButton } from '@/Components/Shared/Modal/sharedPart'
import { ModalHeading } from "@/Styles/Shared/Modal/modal";
import { ErrorMessage, StyleBox } from '@/Styles/Mentor/Home/Manage/User/userRegister/userRegister';

/**
 * 受講生情報入力フォーム
 */
const studentForm = () => {
    const [{ error, select }, { handleSelect, submitStudents, handleNames }] = useRegister();

    return (
        <React.Fragment>
            <ModalHeading>受講生の登録</ModalHeading>
            <Select select={select} handleSelect={handleSelect} />
            <StyleBox>
                {select.number >= 1 &&
                    <React.Fragment>
                        {[...Array(select.number)].map((arr, index) => {
                            return (
                                <div key={`${index}-${select.number}`}>
                                    <p>受講生{index+1}</p>
                                    <TextField
                                        name={index.toString()}
                                        onChange={handleNames}
                                        autoComplete="username"
                                        fullWidth
                                    />
                                </div>
                            )
                        })}
                        {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
                        <SubmitButton text="登録する" handleSubmit={submitStudents} />
                    </React.Fragment>
                }
            </StyleBox>
        </React.Fragment>
    );
};

export default studentForm;
