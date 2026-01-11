import { useState } from "react";
import axios from "axios";
import url from "../constant/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [userId, setUserId] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !newPassword || !confirmPassword) return alert("All fields are required");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/auth/forgot`, { userId, newPassword });
      alert(res.data.message || "Password updated successfully");
      setUserId("");
      setNewPassword("");
      setConfirmPassword("");
      Navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
