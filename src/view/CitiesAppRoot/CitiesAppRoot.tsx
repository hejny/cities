import './CitiesAppRoot.css';
import * as React from 'react';
import { Polygon } from 'react-leaflet';
import { DefaultMap } from '../maps/DefaultMap';
import { fetchCity, OSMPlace } from '../../tools/fetchCity';
import { PieChart, Legend, Pie, Cell } from 'recharts';
//import { scaleOrdinal } from 'd3-scale';
//import { schemeCategory10 } from 'd3-scale-chromatic';
import { PIE_DATA } from '../../dataMocks/data';
//const colors = scaleOrdinal(schemeCategory10).range();

interface CitiesAppRootProps {}

interface CitiesAppRootState {
    places: OSMPlace[];
    center: null | { lat: number; lng: number };
}

export class CitiesAppRoot extends React.Component<
    CitiesAppRootProps,
    CitiesAppRootState
> {
    state: CitiesAppRootState = {
        places: [],
        center: { lat: 50, lng: 14.4 },
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

        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                center: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });
        });
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
                    <PieChart width={420} height={210}>
                        {/* <Legend /> */}
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
                                    fill={entry.color}
                                    stroke={'black'}
                                />
                            ))}
                            {/*<Label value="test" position="outside" />
                            {/*<LabelList position="outside" />*/}
                        </Pie>
                    </PieChart>
                </div>

                <div className="map">
                    {this.state.center && (
                        <DefaultMap center={this.state.center} zoom={9}>
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
                    )}
                </div>
            </div>
        );
    }
}
