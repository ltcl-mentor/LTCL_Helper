import React from "react";
import StudentForm from "./studentForm";
import AdminForm from "./adminForm";
import { CloseButton } from "@/Components/Shared/Modal/sharedPart";

/**
 * ユーザー登録
 */
const userRegister = ({ value, onClose }) => {

    const component = value == 0 ? <StudentForm /> : <AdminForm />

    return (
        <React.Fragment>
            <CloseButton onClose={onClose} />
            {component}
        </React.Fragment>
    );
};

export default userRegister;
