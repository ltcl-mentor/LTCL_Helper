import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Typography from '@material-ui/core/Typography';

/**
 * 校舎位置情報
 */
const Location = (props) => {
    
    return (
        <React.Fragment>
            { props.map_key &&
                <LoadScript googleMapsApiKey={ props.map_key }>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                        center={{ lat: 35.6600511, lng: 139.6973113 }}
                        zoom={15}
                    >
                        <Marker position={{ lat: 35.6601020, lng: 139.6952623 }} />
                    </GoogleMap>
                </LoadScript>
            }
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', mt: 1 }}>住所</Typography>
            <Typography sx={{ fontSize: 20 }}>〒150-0046</Typography>
            <Typography sx={{ fontSize: 20, mb: 2 }}>東京都渋谷区松濤1丁目29-1 4F</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>校舎への入り方</Typography>
            <Typography sx={{ fontSize: 20, mb: 2 }}>1階のファミリーマートに向かって右手にエレベータがあるので、そちらから入室してください。</Typography>
        </React.Fragment>
    );
};

export default Location;