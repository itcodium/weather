import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/v1`);
        return res.data || [];
    }
}