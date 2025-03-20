import React, { useState } from "react";
import "./style.scss";

type ModalProps = {
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => setIsVisible(!isVisible);

  if (!isVisible)
    return (
      <button className="open-btn" onClick={toggleModal}>
        Show recently games
      </button>
    );

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={toggleModal}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
