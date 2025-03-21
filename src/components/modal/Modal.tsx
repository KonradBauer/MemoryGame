import React, { useState, useEffect } from "react";
import "./style.scss";

type ModalProps = {
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => setIsVisible(!isVisible);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible)
    return (
      <button className="open-btn" onClick={toggleModal}>
        Show recently games
      </button>
    );

  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close-btn" onClick={toggleModal}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
