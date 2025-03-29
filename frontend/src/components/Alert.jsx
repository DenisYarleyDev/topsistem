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

  let bgColor = "";
  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "failed":
      bgColor = "bg-red-500";
      break;
  }

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg text-white ${bgColor} animate-fade-in`}
    >
      {message}
    </div>
  );
};

export default Alert;
