import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class Category extends React.Component {
    constructor(props){
        super(props);
        this.state={
            category: 0,
        };
    }
    
    handleCategory(event) {
        this.setState({ category: Number(event.target.value) });
    }
    
    render(){
        let categoryForm=(
                <div className="category_box">
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="category" name="category" value={ this.state.category } onChange={(event) => { this.handleCategory(event) }}>
                            <FormControlLabel value={0} control={<Radio />} label="カリキュラム" />
                            <FormControlLabel value={1} control={<Radio />} label="成果物" />
                        </RadioGroup>
                    </FormControl>
                </div>
            );
        
        return (
            <div className="container">
                { this.props.setCategory(this.state.category) }
                { categoryForm }
            </div>
        );
    }
}

export default Category;
