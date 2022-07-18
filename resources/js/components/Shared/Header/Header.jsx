import React from 'react';
import { useMedia } from 'use-media';
import { Link } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/Shared/Header/applicationLogo';
import QuestionButton from '@/Components/Shared/Header/questionButton';
import UserIcon from '@/Components/Shared/Header/userIcon';
import BreakingPoint from '@/Styles/BreakingPoint';
import { HeaderContent, HeaderPosition, HeaderRight, StyledSearchButton } from '@/Styles/Shared/Header/Header';

/**
 * ヘッダー
 */
const Header = ({ auth, children }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    return (
        <div className="min-h-screen">
            <nav className="bg-white">
                <HeaderPosition>
                    <HeaderContent>
                        <ApplicationLogo />
                        <HeaderRight>
                            <UserIcon user={auth.user} isWide={isWide} />
                            {isWide &&
                            <React.Fragment>
                                <StyledSearchButton>
                                    <Link className='text-white' href={route('search')}>検索する</Link>
                                </StyledSearchButton>
                                <QuestionButton />
                            </React.Fragment>
                            }
                        </HeaderRight>
                    </HeaderContent>
                </HeaderPosition>
            </nav>
            <main>{children}</main>
        </div>
    );
}

export default Header;
