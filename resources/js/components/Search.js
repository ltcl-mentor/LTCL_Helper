import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Category from './categoryForm';
import Topic from './topicForm';
import SearchButton from './searchButton';

function Search() {
    const [category,setCategory]=useState(0);
    const [topic,setTopic]=useState(0);

    return (
        <div className="container">
            <div className="form_box">
                <Category setCategory={setCategory}/>
                <Topic category={category} setTopic={setTopic}/>
                <SearchButton category={category} topic={topic}/>
            </div>
            
            <div className="result_box" id="result_box">
            </div>
        </div>
    );
    
}

export default Search;

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
