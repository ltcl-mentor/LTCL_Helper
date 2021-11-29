import React, {useState,useEffect}  from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

/*
 * カテゴリー選択肢
 */
function Category(props) {
    const [category, setCategory] = useState(0);
    
    const handleCategory = (event) => {
        setCategory(Number(event.target.value));
    };
        
    return (
        <div className="container">
            { props.setCategory(category) }
            
            <FormControl component="fieldset">
                <RadioGroup row aria-label="category" name="category" value={ category } onChange={ (event) => handleCategory(event) }>
                    <FormControlLabel value={0} control={<Radio />} label="カリキュラム" />
                    <FormControlLabel value={1} control={<Radio />} label="成果物" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default Category;
