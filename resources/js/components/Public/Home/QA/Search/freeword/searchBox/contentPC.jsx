import React from 'react';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import ContentMobile from './contentMobile';
import { GridItem, StyleGrid, SearchButton } from '@/Styles/Public/Home/QA/Search/freeword/freeword';

/**
 * PC版検索ボックス
 */
const contentPC = ({ handleFreeword }) => {
    return (
        <StyleGrid container>
            <GridItem item>
                <ContentMobile handleFreeword={handleFreeword} />
            </GridItem>
            <Grid item>
                <SearchButton variant="contained">
                    <SearchIcon />
                </SearchButton>
            </Grid>
        </StyleGrid>
    );
};

export default contentPC;
