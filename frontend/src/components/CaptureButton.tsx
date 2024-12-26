import React from "react";

interface CaptureButtonProps {
  onCapture: (dataUrl: string) => void;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({ onCapture }) => {
  const handleCapture = () => {
    chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, { format: "png" }, (dataUrl) => {
      if (dataUrl) {
        onCapture(dataUrl);
      } else {
        alert("Failed to capture screenshot!");
      }
    });
  };

  return <button onClick={handleCapture}>Capture Text</button>;
};

export default CaptureButton;
