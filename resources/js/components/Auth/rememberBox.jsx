import React from 'react';
import Checkbox from '@/Components/Default/Checkbox';
import Label from '@/Components/Auth/Label';

/**
 * remember me
 */
const rememberBox = ({ data, onHandleChange }) => {
    return (
        <Label className="flex items-center mt-4">
            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
            <span className="ml-2 text-sm text-purple font-bold">ログイン状態を保持</span>
        </Label>
    );
}

export default rememberBox;
