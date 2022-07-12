import React from 'react';
import { Link } from '@inertiajs/inertia-react';

/**
 * 404エラーページ
 */
const Error = () => {
    return (
        <div className='w-11/12 mx-auto mt-72'>
            <div className='w-1/2 my-0 mx-auto bg-gray-300 rounded-lg shadow-xl py-10'>
                <h2 className='font-bold text-center'>Not Found</h2>
                <p className='text-center py-4'>
                    お探しのページは見つかりませんでした。<br/>
                    以下のリンクからTopへお戻り下さい。
                </p>
                <p className='text-center pt-2 font-bold'>
                    <Link href={route('home')}>Topに戻る</Link>
                </p>
            </div>
        </div>
    );
};

export default Error;
