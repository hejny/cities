enum AddressComponentTypes {
    ZIP = 'postal_code',
    Country = 'country',
}

export function geocode(geocoder: any, geocodeRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
        geocoder.geocode(geocodeRequest, (results: any, status: any) => {
            if (status !== 'OK') {
                reject(status);
            }
            const [result] = results;
            if (!result) {
                return reject(new Error('Geocoder did not return any results'));
            }
            const countryAndZIP = result.address_components
                .filter(({ types }: any) =>
                    types.find((type: any) =>
                        Object.values(AddressComponentTypes).includes(type),
                    ),
                )
                .reduce(
                    (results: any, { long_name, types }: any) => ({
                        ...results,
                        [types.includes(AddressComponentTypes.ZIP)
                            ? 'zip'
                            : 'country']: long_name,
                    }),
                    {},
                );
            const location = {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
            };
            resolve({
                ...countryAndZIP,
                ...location,
            });
        });
    });
}
