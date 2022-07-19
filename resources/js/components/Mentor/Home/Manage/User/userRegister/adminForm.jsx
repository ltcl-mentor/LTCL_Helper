import React from "react";
import useMedia from "use-media";
import { useRegister } from "@/Logics/Mentor/Home/Manage/User/userRegister/userRegister";
import ContentPC from "./responsive/contentPC";
import ContentMobile from "./responsive/contentMobile";
import { ModalHeading } from "@/Styles/Shared/Modal/modal";
import { ButtonPos, Submit } from '@/Styles/Shared/Modal/modal';
import BreakingPoint from "@/Styles/BreakingPoint";
import { SubmitButton } from '@/Components/Shared/Modal/sharedPart'

/**
 * 管理者登録
 */
const adminForm = () => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [{ input, validate }, { handleChange, submitAdmin }] = useRegister();

    const responsive = isWide ?
        <ContentPC input={input} validate={validate} handleChange={handleChange} />
    :
        <ContentMobile input={input} validate={validate} handleChange={handleChange} />

    return (
        <React.Fragment>
            <ModalHeading>管理者の登録</ModalHeading>
            {responsive}
            <SubmitButton text="登録する" handleSubmit={submitAdmin} />
        </React.Fragment>
    );
};

export default adminForm;
