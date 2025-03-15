import { useEffect, useState } from "react";

const Alert = ({ message, type, duration = 1000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg text-white ${bgColor} animate-fade-in`}
    >
      {message}
    </div>
  );
};

export default Alert;
