import { useState } from "react";
import axios from "axios";
import url from "../constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddImageModal = ({ closeModal, refresh }) => {
  const [name, setName] = useState("");
  const [viewType, setViewType] = useState("vertical");
  const [file, setFile] = useState(null);

  const submitHandler = async () => {
    if (!file || !name) {
    toast.error("Please fill all fields");
    return;
  }
  
    const formData = new FormData();
    formData.append("imageName", name);
    formData.append("viewType", viewType);
    formData.append("image", file);

    await axios.post(
      `${url}/api/photos/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    refresh();
    closeModal();
    toast.success("Image uploaded successfully");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "320px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#333" }}>
          Add Image
        </h3>

        <input
          type="text"
          placeholder="Image name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        />

        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={submitHandler}
            style={{
              padding: "8px 16px",
              background: "#2d6cdf",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Upload
          </button>

          <button
            onClick={closeModal}
            style={{
              padding: "8px 16px",
              background: "#e0e0e0",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
