const OSM_API = 'https://nominatim.openstreetmap.org';

export async function fetchCity(cityName: string): Promise<OSMPlace> {
    const url = `${OSM_API}/search?format=json&accept-language=en&city=${encodeURIComponent(
        cityName,
    )}&polygon_geojson=1&limit=1`;
    const result = await fetch(url);
    const places: OSMPlace[] = await result.json();

    if (!places.length) {
        throw new Error(
            `There is no city "${cityName}" according to OpenStreetMap. See more at "${url}".`,
        );
    }

    const place = places[0];

    if (place.geojson.type !== 'Polygon') {
        throw new Error(
            `City "${cityName}" has GeoJSON of type "${
                place.geojson.type
            }" not "Polygon" as expected.`,
        );
    }

    return place;
}

export interface OSMPlace {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon: string;
    geojson: OSMGeoJson;
}

export interface OSMGeoJson {
    type: 'Polygon'; //There are other types of GeoJSON, but for this purpose we are using only polygon.
    coordinates: [OSMCoordinate[]];
}

export type OSMCoordinate = [number, number];
