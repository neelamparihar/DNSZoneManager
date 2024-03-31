import React, { useContext } from "react";
import { UserContext } from "../../components/LoginPage/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { ready, user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      return <Navigate to="/login" />;
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  if (!ready) {
    return "Loading...";
  }

  return (
    <div>
      {user && user.name && user.email ? (
        <>
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-md">
              <div className="py-4 px-6">
                <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <p className="text-lg font-semibold">{user && user.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <p className="text-lg font-semibold">{user && user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Profile;
