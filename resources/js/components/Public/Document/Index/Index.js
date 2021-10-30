import React, {useState, useEffect} from 'react';
import axios from "axios";
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
            <Documents 
                documents={ documents }
            />
        </div>
    );
}

export default Index;

