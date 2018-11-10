import { CITIES_CZECHIA_IMAGES } from './../dataMocks/cities';
const SEARCH_API = 'https://contextualwebsearch.com';

export async function searchImage(query: string): Promise<string> {
    return (
        CITIES_CZECHIA_IMAGES[query] ||
        `https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.technocrazed.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fcity-wallpaper-22.jpg&f=1`
    );

    const url = `${SEARCH_API}/api/Search/ImageSearchAPI?q=${encodeURIComponent(
        query,
    )}&count=1&autoCorrect=false&safeSearch=true`;
    const result = await (await fetch(url)).json();

    console.log(result);

    return result.value[0].thumbnail;
}

/*
const SEARCH_API = 'https://api.duckduckgo.com';

export async function searchImage(query: string): Promise<string> {
    const url = `${SEARCH_API}/?q=${encodeURIComponent(query)}&format=json&skip_disambig=1`;
    const result = await (await fetch(url)).json();

    console.log(result);

    return result.Image;
}
*/
