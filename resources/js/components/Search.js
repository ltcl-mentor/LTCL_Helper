import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Category from './categoryForm';
import Topic from './topicForm';
import SearchButton from './searchButton';
import Result from './result';

function Search() {
    const [category,setCategory]=useState(0);
    const [topic,setTopic]=useState(0);
    const [isSearchButtonClicked,setIsSearchButtonClicked]=useState(false);

    return (
        <div className="container">
            <div className="form_box">
                <Category setCategory={setCategory}/>
                <Topic category={category} setTopic={setTopic}/>
                <SearchButton category={category} topic={topic} setIsSearchButtonClicked={setIsSearchButtonClicked}/>
            </div>
            <Result isSearchButtonClicked={isSearchButtonClicked} category={category} topic={topic}/>
        </div>
    );
    
}

export default Search;

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
