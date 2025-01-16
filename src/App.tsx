import { useEffect, useRef, useState } from "react";
import { handleUploadClick, handleFileChange, processImage, handlePaste } from "./utils";
import {toast, ToastContainer} from "react-toastify";
export const App = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showToast = (message: string, error?: boolean) => {
    if (error) toast.error(message);
    else toast.success(message);
  };
  useEffect(() => {
    window.addEventListener("paste", (e) => handlePaste(e, setUploadedImage));
    return () => {
      window.removeEventListener("paste", (e) => handlePaste(e, setUploadedImage));
    };
  }, []);

  useEffect(() => {
    if (uploadedImage) {
      //wait a little before processing the image
      processImage(uploadedImage, tolerance, setProcessedImage, showToast).then();
    }
  }, [uploadedImage, tolerance]);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Remove White Background</h1>

      <div style={{ margin: "20px 0" }}>
        <label htmlFor="tolerance">Tolerance: {tolerance}</label>
        <input
          type="range"
          id="tolerance"
          min="0"
          max="255"
          value={tolerance}
          onChange={(e) => setTolerance(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
      </div>
      {processedImage ? (
        <img
          src={processedImage}
          alt="Processed"
          style={{ maxWidth: "100%", margin: "20px auto", backgroundColor: "#333" }}
        />
      ) : (
        <input
          type={"text"}
          style={{
            border: "2px dashed #ccc",
            padding: "50px",
            margin: "20px auto",
            maxWidth: "600px",
            height: "300px",
            backgroundColor: "#f9f9f9",
            color: "#000",
            width: "100%",
            caretColor: "transparent",
          }}
          onClick={() => handleUploadClick(fileInputRef)}
          onDragOver={(e) => e.preventDefault()}
          placeholder={"Click here or paste an image to get started"}
        ></input>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => handleFileChange(e, setUploadedImage)}
      />
      <br />
      <button
        onClick={() => {
          setUploadedImage(null);
          setProcessedImage(null);
        }}
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Reset
      </button>
      <ToastContainer position={"top-center"} hideProgressBar={true} closeOnClick={true}/>
    </div>
  );
};
