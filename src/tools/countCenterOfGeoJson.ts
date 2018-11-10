import { ICoordinates } from '../view/maps/ICoordinates';
import { OSMGeoJson, OSMCoordinate } from './fetchCity';

export function countCenterOfGeoJson(geoJson: OSMGeoJson): ICoordinates {
    return getCoordinates(geoJson.coordinates[0][0]);//todo real center
}

export function getCoordinates(osmCoordinates: OSMCoordinate): ICoordinates {
    return {
        lat: osmCoordinates[1],
        lng: osmCoordinates[0],
    };
}
