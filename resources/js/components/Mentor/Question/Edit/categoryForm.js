import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

/**
 * カテゴリーフォーム
 */
function Category(props) {
    const categories = ['カリキュラム', '成果物'];
    
    const handleCategory = (event) => {
        props.setCategory(Number(event.target.value));
    };
        
    return (
        <div>
            <p>変更前：{ categories[ props.old_category ] }</p>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="category" name="post[category]" value={ Number(props.category) } onChange={ (event) => handleCategory(event) }>
                    <FormControlLabel value={0} control={<Radio />} label="カリキュラム" />
                    <FormControlLabel value={1} control={<Radio />} label="成果物" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default Category;
