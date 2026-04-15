
import api from "./api";

// PUBLIC
export const getPublicSettings = async () => {
  const res = await api.get("/settings/public");
  return res.data;
};

// ADMIN
export const getSettings = async () => {
  const res = await api.get("/settings");
  return res.data;
};

// ADMIN: Update settings
export const updateSettings = async (data, files) => {
  const formData = new FormData();

  // Append text fields but skip base64 image previews
  Object.keys(data).forEach((key) => {
    if (key !== "siteLogo" && key !== "banner") {
      formData.append(key, data[key]);
    }
  });

  // Append real files only
  if (files?.siteLogo instanceof File) {
    formData.append("siteLogo", files.siteLogo);
  }

  if (files?.banner instanceof File) {
    formData.append("banner", files.banner);
  }

  const res = await api.put("/settings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


// ADMIN: Delete settings (optional)
export const deleteSettings = async () => {
  const res = await api.delete("/settings");
  return res.data;
};
