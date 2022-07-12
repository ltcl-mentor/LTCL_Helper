import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Grid from '@mui/material/Grid';

import Breadcrumbs from '../../../../Components/Shared/Breadcrumbs';
import Forms from './forms';

/**
 * 受講生登録のメインコンポーネント
 */
function Public() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [number, setNumber] = useState('');

    const handleYear = (event) => {
        setYear(event.target.value);
    };

    const handleMonth = (event) => {
        setMonth(event.target.value);
    };

    const handleNumber = (event) => {
        setNumber(event.target.value);
    };

    var today = new Date();
    let thisYear = today.getFullYear();

    return (
        <div className="container">
            <Breadcrumbs page="mentor_public_create"/>

            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <Card sx={{ marginBottom: 2 }}>
                    <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                        <Grid item>
                            <select onChange={ (event) => handleYear(event) } required>
                                <option value="">選択してください。</option>
                                <option value={ thisYear-1 }>{ thisYear-1 }</option>
                                <option value={ thisYear }>{ thisYear }</option>
                                <option value={ thisYear+1 }>{ thisYear+1 }</option>
                            </select>
                            年
                        </Grid>

                        <Grid item>
                            <select onChange={ (event) => handleMonth(event) } required>
                                <option value="">選択してください。</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            月の入学者を
                        </Grid>

                        <Grid item>
                            <select onChange={ (event) => handleNumber(event) } required>
                                <option value="">選択してください。</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                            名登録する
                        </Grid>
                    </Grid>
                </Card>

                <Forms
                    password={ 'ltcl' + year%100 + ( '0' + month ).slice(-2) }
                    number={ number }
                />
            </Box>
        </div>
    );
}

export default Public;
