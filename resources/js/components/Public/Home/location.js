import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Divider from '@material-ui/core/Divider';

function Location(props) {
    const [map_api_key, setMapApiKey] = useState();
    
    useEffect(() => {
        axios
            .get(`/react/map`)
            .then(response => {
                setMapApiKey(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid
                item
                sx={{
                    marginTop: 1,
                }}
            >
                { map_api_key &&
                    <LoadScript googleMapsApiKey={ map_api_key }>
                        <GoogleMap
                            mapContainerStyle={{ width: '300px', height: '300px' }}
                            center={{ lat: 35.6600511, lng: 139.6973113 }}
                            zoom={15}
                        >
                            <Marker position={{ lat: 35.6601020, lng: 139.6952623 }} />
                        </GoogleMap>
                    </LoadScript>
                }
            </Grid>
            
            <Grid item>
                <Divider />
                
                <Table sx={{ minWidth: 300, paddingBottom: 5 }} aria-label="simple table">
                    <TableBody>
                        <TableRow
                            key='time'
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                sx={{
                                    minWidth: "120Px",
                                }}
                            >
                                校舎住所
                            </TableCell>
                            <TableCell align="left">
                                <div>〒150-0046</div>
                                <div>東京都渋谷区松濤１丁目２９−１ 4F</div>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key='time'
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                sx={{
                                    minWidth: "120Px",
                                }}
                            >
                                校舎の入り方
                            </TableCell>
                            <TableCell align="left">
                                1階のファミリーマートに向かって右手にエレベータがあるので、そちらから入室してください。
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default Location;