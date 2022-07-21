import React from 'react';
import CardContent from '@mui/material/CardContent';
import RankChip from './rankChip';
import { Document, DocumentPos, NotePMImg, DocumentTitle } from '@/Styles/Public/Question/Index/Index/Index';

/**
 * 記事
 */
const document = ({ document }) => {
    return (
        <DocumentPos key={document.title}>
            <a href={document.link} target="_blank">
                <Document>
                    <NotePMImg image="/images/NotePM_Logo_Vertical.png" />
                    <CardContent>
                        <RankChip rank={document.beginner} status="beginner" />
                        <RankChip rank={document.amature} status="amature" />
                        <RankChip rank={document.master} status="master" />
                        <RankChip rank={document.all} status="all" />
                        <DocumentTitle>{document.title}</DocumentTitle>
                    </CardContent>
                </Document>
            </a>
        </DocumentPos>
    );
}

export default document;
