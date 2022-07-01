import React from 'react';
import { useMedia } from 'use-media';
import { Link } from '@inertiajs/inertia-react';

import BreakingPoint from '@/Styles/BreakingPoint';
import ApplicationLogo from '@/components/Default/ApplicationLogo';
import Button from '@/components/Default/Button';
import QuestionButton from '@/components/Common/questionButton';
import User from '@/components/Common/userIcon';

/**
 * ヘッダー
 */
const Header = ({ auth, children }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    let responsive;
    if (isWide) {
        responsive = (
            <React.Fragment>
                <Button className="w-24 justify-center h-9">
                    <Link className='text-white' href={route('search')}>検索する</Link>
                </Button>
                <QuestionButton />
            </React.Fragment>
        );
    }


    return (
        <div className="min-h-screen">
            <nav className="bg-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <ApplicationLogo />

                        <div className="flex justify-center items-center">
                            <User user={auth.user} isWide={isWide} />
                            {responsive}
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}

export default Header;
