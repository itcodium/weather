import axios from 'axios';

export default {
    getCurrent: async (city) => {
        console.log('city: ', city);
        let url = `/api/v1/current` + (city ? "/" + city : "");
        console.log('url: ', url);
        let res = await axios.get(url);
        return res.data || [];
    },
    getForecast: async (city) => {
        console.log('city: ', city);
        let url = `/api/v1/forecast` + (city ? "/" + city : "");
        console.log('url: ', url);
        let res = await axios.get(url);
        return res.data || [];
    }
}