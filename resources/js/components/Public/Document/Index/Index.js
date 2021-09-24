
import React, {useState, useEffect} from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
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
    },[]);
    
    return (
        <div>
            <Documents 
                documents={ documents }
            />
        </div>
    );
}

export default Index;

if (document.getElementById('Document_public_index')) {
    ReactDOM.render(<Index />, document.getElementById('Document_public_index'));
}
