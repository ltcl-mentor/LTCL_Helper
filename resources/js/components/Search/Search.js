import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Category from './categoryForm';
import Topic from './topicForm';
import Addition from './additionalForms';
import SearchButton from './searchButton';
import Result from './result';

function Search() {
    const [category, setCategory] = useState();
    const [topic, setTopic] = useState();
    const [curriculum_number, setCurriculumnumber] = useState();
    const [keyword, setKeyword] = useState();
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];

    return (
        <div className="container">
            <div className="form_box">
                <Category 
                    setCategory={ setCategory }
                    categories={ categories }
                />
                <Topic 
                    category={ category }
                    setTopic={ setTopic }
                    topics={ topics }
                />
                <Addition 
                    category={ category }
                    topic={ topic }
                    setCurriculumnumber={ setCurriculumnumber }
                    setKeyword={ setKeyword }
                />
                <SearchButton
                    category={ category }
                    topic={ topic }
                    curriculum_number={ curriculum_number }
                    keyword={ keyword }
                    setIsSearchButtonClicked={ setIsSearchButtonClicked }
                />
            </div>
            
            <Result
                isSearchButtonClicked={ isSearchButtonClicked }
                category={ category }
                topic={ topic }
                categories={ categories }
                topics={ topics }
                curriculum_number={ curriculum_number }
                keyword={ keyword }
            />
            
        </div>
    );
    
}

export default Search;

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
