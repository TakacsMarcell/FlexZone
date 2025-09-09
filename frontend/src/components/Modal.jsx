import React from "react";
import styled, { keyframes } from "styled-components";

const colors = {
  green: "#65C466",
  lightGray: "#D3D3D3",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
};

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${colors.darkGray};
  padding: 36px 28px;
  border-radius: 20px;
  width: 92%;
  max-width: 560px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.25s ease;
  text-align: left;
  color: ${colors.white};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  background: ${colors.black};
  border: none;
  color: ${colors.white};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  padding: 6px 10px;
  transition: 0.25s;

  &:hover {
    background: ${colors.green};
    color: ${colors.black};
    transform: scale(1.06);
  }
`;

const ModalTitle = styled.h3`
  font-size: 26px;
  color: ${colors.green};
  margin: 0 0 10px;
`;

const ModalText = styled.p`
  font-size: 16px;
  color: ${colors.lightGray};
  line-height: 1.65;
  margin: 0 0 14px;
`;

const ModalBody = styled.div`
  margin-top: 8px;
`;

const Modal = ({ title, message, onClose, children }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {title && <ModalTitle>{title}</ModalTitle>}
        {message && <ModalText>{message}</ModalText>}
        {children && <ModalBody>{children}</ModalBody>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
