import React, { useState } from "react";
import CaptureButton from "./components/CaptureButton";
import ResultDisplay from "./components/ResultDisplay";

const App: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const handleCapture = (dataUrl: string) => {
    const blob = dataURLToBlob(dataUrl);
    const formData = new FormData();
    formData.append("image", blob, "screenshot.png");

    fetch("http://127.0.0.1:5000/upload_image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setResult(data.result);
        } else {
          alert("Error processing image: " + data.error);
        }
      })
      .catch((error) => {
        alert("Error contacting backend: " + error);
      });
  };

  const dataURLToBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <div className="App">
      <h1>SnapText</h1>
      <CaptureButton onCapture={handleCapture} />
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;
