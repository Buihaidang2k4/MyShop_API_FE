import apiBase from "./apiBase";

const blobConfig = { responseType: "blob" };

const imageService = {
  getImagesByProductId: (productId) =>
    apiBase.get(`/images/product/${productId}/images`),

  getImageById: (id) =>
    apiBase.get(`/images/image/download/${id}`, blobConfig),
};

export default imageService;
