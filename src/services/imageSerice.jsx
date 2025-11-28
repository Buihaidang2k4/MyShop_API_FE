import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1/images",
  withCredentials: true,
});

const blobConfig = { responseType: "blob" };

const imageService = {
  getImagesByProductId: (productId) =>
    instance.get(`/product/${productId}/images`),

  getImageById: (id) =>
    instance.get(`/image/download/${id}`, blobConfig),
};

export default imageService;
