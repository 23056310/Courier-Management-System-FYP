
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile, changePassword } from "../../services/authService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load current user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfilePic(null);
    }
  }, [user]);

  // SHOW profile image (preview if new image chosen)
  const displayProfilePic = profilePic
    ? URL.createObjectURL(profilePic)
    : user?.profilePic || "/default-avatar.png";

  // UPDATE PROFILE
  const handleProfileUpdate = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (profilePic) formData.append("profilePic", profilePic);

      const data = await updateProfile(formData);

      // updateProfile() ALREADY returns formatted full image URL
      setUser(data.user);

      setMessage(data.message || "Profile updated successfully!");
      setIsEditing(false);
      setProfilePic(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Profile update failed!");
    } finally {
      setIsSaving(false);
    }
  };

  // CHANGE PASSWORD
  const handleChangePassword = async () => {
    setMessage("");

    try {
      const data = await changePassword({ oldPassword, newPassword });
      setMessage(data.message);
      setOldPassword("");
      setNewPassword("");
      setIsChangingPassword(false);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Password change failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      
      {/* Hero */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Manage your account and update your personal information.
        </p>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* Profile Image */}
        <div className="flex-1 flex flex-col items-center lg:items-start gap-4">
          <img
            src={displayProfilePic}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="text-sm text-gray-600"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-6">

          {!isEditing ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600 text-lg">Email: {user?.email}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Change Password
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4"
              />

              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleProfileUpdate}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* Change Password */}
          {isChangingPassword && (
            <div className="space-y-4 mt-6">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleChangePassword}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Message */}
          {message && (
            <p className="text-center text-blue-600 mt-4">{message}</p>
          )}
        </div>
      </section>
       <Footer />
    </div>
  );
}
