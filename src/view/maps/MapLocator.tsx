import * as React from 'react';
import GoogleMapReact, { ChangeEventValue, Coords } from 'google-map-react';
import { GoogleMapMarker } from './GoogleMapMarker';

export interface IMapLocatorProps {
    center: Coords;
    onLocationChange: (location: Coords) => void;
    onGecoderLoad?: (geocoder: any) => void;
}

export class MapLocator extends React.Component<IMapLocatorProps, {}> {
    static defaultProps = {
        onGecoderLoad: () => {},
    };

    componentDidMount() {
        if ('geolocation' in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(
                this.geolocationHandler,
            );
        }
    }

    changeHandler = ({ center }: ChangeEventValue) =>
        this.props.onLocationChange(center);

    geolocationHandler = ({ coords: { latitude, longitude } }: Position) => {
        const center = {
            lat: latitude,
            lng: longitude,
        };
        this.setState({ center });
        this.props.onLocationChange(center);
    };

    mapsAPILoadHandler = ({ maps }: any) =>
        this.props.onGecoderLoad!(new maps.Geocoder());

    render() {
        const { center } = this.props;

        return (
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyCrCp4g-ezTFzONxAqpSu4OQfSOiHdASsg',
                }}
                defaultZoom={8}
                onChange={this.changeHandler}
                onGoogleApiLoaded={this.mapsAPILoadHandler}
                {...{ center }}
            >
                <GoogleMapMarker />
            </GoogleMapReact>
        );
    }
}
