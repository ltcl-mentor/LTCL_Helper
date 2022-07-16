import React from 'react';
import { useChangeTab } from '@/Logics/Public/Home/tabPanel';
import { a11yProps } from "@/Components/Shared/a11yProps";
import { StyledBox, StyledTab, StyledTabArea, StyledTabs } from '@/Styles/Public/Home/tabPanel';

/**
 * タブパネル
 */
const tabPanel = ({ auth }) => {
    const [{ value, component }, handleChange] = useChangeTab(auth.user);

    return (
        <StyledBox>
            <StyledTabArea>
                <StyledTabs value={value} onChange={handleChange}>
                    <StyledTab label="Top" {...a11yProps(0)} />
                    <StyledTab label="Q&A" {...a11yProps(1)} />
                    {auth.user.is_admin == 'staff' &&
                        <StyledTab label="管理" {...a11yProps(2)} />
                    }
                </StyledTabs>
            </StyledTabArea>

            {component}

        </StyledBox>
    );
};

export default tabPanel;
