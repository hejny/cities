import { CITIES_CZECHIA_CONCRETE } from './cities';

const PIE_DATAS: {
    [k: string]: IPieData[];
} = {};

export function generate_PIE_DATA(cityName: string): IPieData[] {
    if (!PIE_DATAS[cityName]) {
        //console.log('nnn',CITIES_CZECHIA_CONCRETE[cityName],CITIES_CZECHIA_CONCRETE,cityName);
        const concrete = CITIES_CZECHIA_CONCRETE[cityName] || Math.random();

        const PIE_DATA = [
            { name: 'Concrete', value: concrete, color: '#EC8051' },
            { name: 'Nature', value: 1 - concrete, color: '#22ee66' },
        ];

        PIE_DATAS[cityName] = PIE_DATA;
        //console.log(PIE_DATA);
    }
    return PIE_DATAS[cityName];
}

interface IPieData {
    name: string;
    value: number;
    color: string;
}
