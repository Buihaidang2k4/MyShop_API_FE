import imageService from "../../services/imageSerice";
import { useState, useEffect } from "react";
import imgDefault from "../../assets/image/mylogo.png"

export default function useImageUrl(images) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const randomIndex = Math.floor(Math.random() * images?.length);
      const imageId = images?.[randomIndex]?.id;

      if (imageId !== null && imageId !== undefined) {
        try {
          const res = await imageService.getImageById(imageId);
          const url = URL.createObjectURL(res.data);
          setImageUrl(url);
        } catch (err) {
          console.error("Lỗi khi lấy ảnh:", err);
          setImageUrl(`${imgDefault}`);
        }
      } else {
        setImageUrl(`${imgDefault}`);
      }
    };

    fetchImage();
  }, [images]);

  return imageUrl;
}
