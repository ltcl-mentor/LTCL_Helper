import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Typography from '@material-ui/core/Typography';

// Googleマップの緯度経度設定
const mapCenter = {
    lat: 35.6600511,
    lng: 139.6973113
};
const collegeLocation = {
    lat: 35.6601020,
    lng: 139.6952623
};

// 各パーツのスタイル設定
const styleAddress = { marginTop: '10px' };
const styleTitle = {
    fontSize: 20,
    fontWeight: 'bold'
};
const styleBody = {
    fontSize: 18,
    pb: 2 
};
const mapContainerStyle = { 
    width: '100%', 
    height: '300px' 
};


/**
 * 校舎位置情報
 */
const location = (props) => {
    
    return (
        <React.Fragment>
            { props.mapKey &&
                <LoadScript googleMapsApiKey={props.mapKey}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={15}
                    >
                        <Marker position={collegeLocation} />
                    </GoogleMap>
                </LoadScript>
            }
            <div style={styleAddress}>
                <Typography sx={styleTitle}>住所</Typography>
                <Typography sx={styleBody}>〒150-0046<br/>東京都渋谷区松濤1丁目29-1 4F</Typography>
                <Typography sx={styleTitle}>校舎への入り方</Typography>
                <Typography sx={styleBody}>1階のファミリーマートに向かって右手にエレベータがあるので、そちらから入室してください。</Typography>
            </div>
        </React.Fragment>
    );
};

export default location;