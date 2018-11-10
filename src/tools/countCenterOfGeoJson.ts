import { ICoordinates } from '../view/maps/ICoordinates';
import { OSMGeoJson, OSMCoordinate } from './fetchCity';

export function countCenterOfGeoJson(geoJson: OSMGeoJson): ICoordinates {

    let coordsAggregated:[number,number] = [0,0];
    for(const coords of geoJson.coordinates[0]){
        coordsAggregated[0]+=coords[0];
        coordsAggregated[1]+=coords[1];
    }

    coordsAggregated[0]/=geoJson.coordinates[0].length;
    coordsAggregated[1]/=geoJson.coordinates[0].length;

    return getCoordinates(coordsAggregated);//todo real center
}

export function getCoordinates(osmCoordinates: OSMCoordinate): ICoordinates {
    return {
        lat: osmCoordinates[1],
        lng: osmCoordinates[0],
    };
}
