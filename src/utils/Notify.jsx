import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const toastStyles = {
  success: {
    style: {
      background: "linear-gradient(90deg, #4CAF50, #66BB6A)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  error: {
    style: {
      background: "linear-gradient(90deg, #F44336, #EF5350)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    icon: <FontAwesomeIcon icon={faTimesCircle} />,
  },
  info: {
    style: {
      background: "linear-gradient(90deg, #2196F3, #42A5F5)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  },
  warning: {
    style: {
      background: "linear-gradient(90deg, #FF9800, #FFA726)",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
  },
};

// Config chung
const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// API notify để sử dụng ở bất cứ đâu
export const notify = {
  success: (message) =>
    toast.success(
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 8 }}>{toastStyles.success.icon}</span>
        {message}
      </div>,
      { ...defaultConfig, style: toastStyles.success.style }
    ),
  error: (message) =>
    toast.error(
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 8 }}>{toastStyles.error.icon}</span>
        {message}
      </div>,
      { ...defaultConfig, style: toastStyles.error.style }
    ),
  info: (message) =>
    toast.info(
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 8 }}>{toastStyles.info.icon}</span>
        {message}
      </div>,
      { ...defaultConfig, style: toastStyles.info.style }
    ),
  warning: (message) =>
    toast.warning(
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 8 }}>{toastStyles.warning.icon}</span>
        {message}
      </div>,
      { ...defaultConfig, style: toastStyles.warning.style }
    ),
};

// Component Provider
export default function NotifyProvider() {
  return <ToastContainer newestOnTop={true} />;
}
