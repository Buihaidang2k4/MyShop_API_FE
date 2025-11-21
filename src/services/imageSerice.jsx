import axios from 'axios';
const config ={responseType: 'blob'}
const API_HOST = import.meta.env.VITE_API_HOST;
const BASE_URL = `${API_HOST}/api/v1/images`;

const imageService = {
  getImagesByProductId: (productId) => axios.get(`${BASE_URL}/product/${productId}/images`),
  getImageById: (id) => axios.get(`${BASE_URL}/image/download/${id}`,config),
};

export default imageService;