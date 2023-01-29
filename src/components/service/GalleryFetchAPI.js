import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '31255927-4de5778e57c1de2feb517f55b';
const ParametersSearch = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=12';

export async function galleryFetchAPI(imgSearch, page) {
            const response = await axios(`/?key=${API_KEY}&q=${imgSearch}&${ParametersSearch}&page=${page}`);
            return (response.data);
};
