import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

import Documents from '../../Question/Show/documents';

function Index() {
    const [documents , setDocuments] = useState([]);
    
    useEffect(() => {
        axios
            .get("/react/all/documents")
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Typography color="text.primary">
                    関連記事一覧
                </Typography>
            </Breadcrumbs>
            
            <Documents 
                documents={ documents }
            />
        </div>
    );
}

export default Index;

