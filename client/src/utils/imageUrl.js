
export const getImageUrl = (path) => {
  if (!path) return "";
  return `${import.meta.env.VITE_API_IMAGE_URL}/${path}`;
};
