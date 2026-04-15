
export const formatProfilePic = (path) => {
  if (!path) return "/default-avatar.png";

  const baseURL = import.meta.env.VITE_API_IMAGE_URL || "http://localhost:8000";

  return `${baseURL}/${path.replace(/\\/g, "/")}`;
};
