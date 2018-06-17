import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://myburger-d3410.firebaseio.com/'
});

export default instance;