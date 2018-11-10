import './CitiesAppRoot.css';
import * as React from 'react';
import { Marker, Polygon } from 'react-leaflet';
import { DefaultMap } from '../maps/DefaultMap';
import { OSMGeoJson, fetchCity, OSMPlace } from '../../tools/fetchCity';
import {
    LineChart,
    XAxis,
    Tooltip,
    CartesianGrid,
    Line,
    PieChart,
    Legend,
    Pie,
    Label,
    LabelList,
    Cell,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Polyline } from 'leaflet';
import { PIE_DATA } from '../../dataMocks/data';
const colors = scaleOrdinal(schemeCategory10).range();

const MAP_CENTER = { lat: 49.37522008, lng: 13.66699218 };

function randomInt(max = 1) {
    return Math.floor(random(max));
}

function random(max = 1) {
    return Math.random() * max;
}

function randomSign() {
    return random() < 0.5 ? -1 : 1;
}

interface CitiesAppRootProps {}

interface CitiesAppRootState {
    places: OSMPlace[];
}

export class CitiesAppRoot extends React.Component<
    CitiesAppRootProps,
    CitiesAppRootState
> {
    state: CitiesAppRootState = {
        places: [],
    };

    constructor(props: CitiesAppRootProps) {
        super(props);
        this.loadCity('Prague');
        this.loadCity('Warsaw');
        this.loadCity('Poznan');
        this.loadCity('Krakow');
        this.loadCity('Gdansk');
        this.loadCity('Brno');
        this.loadCity('Olomouc');
        this.loadCity('Budapest');
        //this.loadCity('Nürnberg');
        //this.loadCity('Berlin');
        //this.loadCity('Paris'); - only one district
        //this.loadCity('Bratislava');
        //this.loadCity('Wien');
    }

    async loadCity(cityName: string) {
        const city = await fetchCity(cityName);
        this.setState({ places: [...this.state.places, city] });
    }

    render() {
        return (
            <div className="CitiesAppRoot">
                {/* <div
                    className=""
                    style={{
                        background: `url("https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fwww.timeout.com%2Fwp-content%2Fuploads%2F2014%2F08%2FCharles_Bridge_courtyardpixShutterstock.com_.jpg&u=https://www.timeout.com/wp-content/uploads/2014/08/Charles_Bridge_courtyardpixShutterstock.com_.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom center',
                    }}
                >
                    Prague
                </div> */}

                <div className="chart">
                    <PieChart width={800} height={400}>
                        <Legend />
                        <Pie
                            data={PIE_DATA}
                            dataKey="value"
                            cx={200}
                            cy={200}
                            startAngle={180}
                            endAngle={0}
                            outerRadius={200}
                        >
                            {PIE_DATA.map((entry, index) => (
                                <Cell
                                    key={`slice-${index}`}
                                    fill={colors[index % 10]}
                                />
                            ))}
                            {/*<Label value="test" position="outside" />
                            {/*<LabelList position="outside" />*/}
                        </Pie>
                    </PieChart>
                </div>

                <div className="map">
                    <DefaultMap center={MAP_CENTER} zoom={8}>
                        {/* {markers.map((position, key) => (
                            <Marker {...{ position, key }} />
                        ))} */}

                        {this.state.places.map((place: OSMPlace) => (
                            <Polygon
                                key={place.place_id}
                                positions={place.geojson.coordinates[0].map(
                                    ([lng, lat]) => ({ lat, lng }),
                                )}
                            />
                        ))}
                    </DefaultMap>
                </div>
            </div>
        );
    }
}
