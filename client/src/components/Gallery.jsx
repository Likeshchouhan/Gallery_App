 import { useEffect, useState } from "react";
import axios from "axios";
import AddImageModal from "./AddImageModal";
import url from "../constant/constant";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchImages = async () => {
    const res = await axios.get(`${url}/api/photos/gallery`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const sortedImages = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setImages(sortedImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

const buildRows = (images) => {
  const rows = [];

  let topVertical = [];       
  let bottomVertical = [];    

  images.forEach((img) => {
    if (img.viewType === "vertical") {
      if (topVertical.length < 2) {
        topVertical.push(img);
      }
      else {
        bottomVertical.push(img);

        if (bottomVertical.length === 2) {
          rows.push({
            type: "vertical",
            items: [...bottomVertical],
          });
          bottomVertical = [];
        }
      }
    } else {
      rows.push({
        type: "horizontal",
        items: [img],
      });
    }
  });

  if (bottomVertical.length > 0) {
    rows.push({
      type: "vertical",
      items: [...bottomVertical],
    });
  }

  if (topVertical.length > 0) {
    rows.unshift({
      type: "vertical",
      items: [...topVertical]
    });
  }

  return rows;
};

 const renderImages = () => {
  const rows = buildRows(images);

  return (
    <>
      {rows.map((row, index) => {
        if (row.type === "horizontal") {
          return (
            <div key={index} style={{ marginBottom: "15px" }}>
              <img
                src={`${url}${row.items[0].imageUrl}`}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          );
        }
        const verticalItems = [...row.items].reverse();
        return (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            {verticalItems.map((img) => (
              <img
                key={img._id}
                src={`${url}${img.imageUrl}`}
                style={{
                  width: "50%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        );
      })}
    </>
  );
};


  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "32px",
          background: "#2d6cdf",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        +
      </button>

      {open && (
        <AddImageModal
          closeModal={() => setOpen(false)}
          refresh={fetchImages}
        />
      )}

      <div style={{ marginTop: "20px" }}>{renderImages()}</div>
    </div>
  );
};

export default Gallery;


