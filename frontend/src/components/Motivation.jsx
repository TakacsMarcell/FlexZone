import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import background from '../images/background.png';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;

  @media (max-width: 1024px) {
    height: 80vh;  
  }

  @media (max-width: 768px) {
    height: 70vh;  
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
`;

const Content = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px; 
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 3rem; 
  }

  @media (max-width: 768px) {
    font-size: 2.5rem; 
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 1.2rem; 
  }

  @media (max-width: 768px) {
    font-size: 1rem; 
  }
`;

const CTAButton = styled.button`
  padding: 15px 30px;
  background-color: #65c466;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(56, 159, 58);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;  
    font-size: 1rem;  
  }
`;

const Motivation = () => {
  
  const user = useSelector((state) => state.user.currentUser); 

  return (
    <Container>
      <Overlay />
      <Content>
        <Title>Lépj a következő szintre!</Title>
        <Subtitle>Személyre szabott edzéstervek és táplálkozási tanácsadás</Subtitle>
        
        {!user && (
          <Link to="login">
            <CTAButton>KEZDJ HOZZÁ AZONNAL!</CTAButton>
          </Link>
        )}
      </Content>
    </Container>
  );
};

export default Motivation;
