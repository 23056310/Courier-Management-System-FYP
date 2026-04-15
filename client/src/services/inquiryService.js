
// src/services/inquiryService.js

import api from "./api"; 
/* ======================================================
   PUBLIC: Submit Inquiry (Contact Page)
====================================================== */
export const submitInquiry = async (data) => {
  const res = await api.post("/inquiries/submit", data);
  return res.data;
};

/* ======================================================
   ADMIN: Get All Inquiries
====================================================== */
export const getAllInquiries = async () => {
  const res = await api.get("/inquiries");
  return res.data;
};

/* ======================================================
   ADMIN: Respond to Inquiry (Send Email)
====================================================== */
export const respondInquiry = async (id, message) => {
  const res = await api.post(`/inquiries/respond/${id}`, { message });
  return res.data;
};

/* ======================================================
   ADMIN: Delete Inquiry
====================================================== */
export const deleteInquiry = async (id) => {
  const res = await api.delete(`/inquiries/${id}`);
  return res.data;
};
