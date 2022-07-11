import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Address, AddressBody, AddressTitle } from '@/Styles/Public/Home/Top/Footer/location';

// Googleマップの緯度経度、スタイル設定
const mapCenter = {
    lat: 35.6600511,
    lng: 139.6973113
};
const collegeLocation = {
    lat: 35.6601020,
    lng: 139.6952623
};
const mapContainerStyle = {
    width: '100%',
    height: '300px'
};

/**
 * 校舎位置情報
 */
const location = ({ mapKey }) => {

    return (
        <React.Fragment>
            { mapKey &&
                <LoadScript googleMapsApiKey={mapKey}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={15}
                    >
                        <Marker position={collegeLocation} />
                    </GoogleMap>
                </LoadScript>
            }
            <Address>
                <AddressTitle>住所</AddressTitle>
                <AddressBody>〒150-0046<br/>東京都渋谷区松濤1丁目29-1 4F</AddressBody>
                <AddressTitle>校舎への入り方</AddressTitle>
                <AddressBody>1階のファミリーマートに向かって右手にエレベータがあるので、そちらから入室してください。</AddressBody>
            </Address>
        </React.Fragment>
    );
};

export default location;
