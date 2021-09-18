import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

function CrriculumNumber(props) {
    const [curriculumNumber, setCurriculumNumber] = useState('');
    
    const handleCurriculumNumber = (event) => {
        setCurriculumNumber(event.target.value);
    };

    let curriculum_number;
    if(props.category === 0){
        if(props.topic === 0){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="1-1-1">1-1-1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 1){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="2-1-1">2-1-1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 2){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="2-1-2">2-1-2</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 3){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="2-1-3">2-1-3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 4){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="3-1-1">3-1-1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 5){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="4-1-1">4-1-1</MenuItem>
                            <MenuItem value="4-1-2">4-1-2</MenuItem>
                            <MenuItem value="4-1-3">4-1-3</MenuItem>
                            <MenuItem value="4-1-4">4-1-4</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 6){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="5-1-1">5-1-1</MenuItem>
                            <MenuItem value="8-1-1">8-1-1</MenuItem>
                            <MenuItem value="8-2-1">8-2-1</MenuItem>
                            <MenuItem value="8-3-1">8-3-1</MenuItem>
                            <MenuItem value="8-4-1">8-4-1</MenuItem>
                            <MenuItem value="8-5-1">8-5-1</MenuItem>
                            <MenuItem value="8-6-1">8-6-1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 7){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="6-1-1">6-1-1</MenuItem>
                            <MenuItem value="6-2-1">6-2-1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }else if(props.topic === 8){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <FormControl>
                        <FormLabel component="legend">カリキュラム番号</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => { handleCurriculumNumber(event) }}
                        >
                            <MenuItem value="7-1-1">7-1-1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
        }
        
    }else if(props.category === 1){
        curriculum_number = (
            <div className="curriculum_number_box">
                <FormControl>
                    <FormLabel component="legend">カリキュラム番号</FormLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(event) => { handleCurriculumNumber(event) }}
                    >
                        <MenuItem value="成果物">成果物</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
     
    return (
        <div className="content">
            { curriculum_number }
            { props.setCurriculumNumber(curriculumNumber) }
        </div>
    );
}

export default CrriculumNumber;