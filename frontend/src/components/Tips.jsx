import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Section = styled.section`
  position: relative;
  background: #000;        
  padding: 60px 20px;      
  text-align: center;
  color: #fff;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #65C466;         
  margin-bottom: 20px;
`;

const TipWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 0 60px;         
`;

const TipTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #fff;
`;

const Desc = styled.p`
  font-size: 1.1rem;
  color: #d3d3d3;         
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;                        
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #888;
  font-size: 2.2rem;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
  opacity: 0.7;
  z-index: 2;

  &:hover {
    color: #65C466;
    transform: translateY(-50%) scale(1.08);
    opacity: 1;
  }

  ${({ side }) => (side === "left" ? "left: 16px;" : "right: 16px;")}
`;

const TipsSection = () => {
  const [tips, setTips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tips");
        if (res.data.length > 0) {
          setTips(res.data);
          const randomIndex = Math.floor(Math.random() * res.data.length);
          setCurrentIndex(randomIndex);
        }
      } catch (err) {
        console.error("Hiba a tippek betöltésekor:", err);
      }
    };
    fetchTips();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tips.length - 1 : prev - 1));
  };

  if (tips.length === 0) {
    return (
      <Section>
        <p>Betöltés...</p>
      </Section>
    );
  }

  const tip = tips[currentIndex];

  return (
    <Section>
      <Arrow side="left" onClick={handlePrev}>◀</Arrow>
      <Arrow side="right" onClick={handleNext}>▶</Arrow>

      <Title>Mai jótanács</Title>

      <TipWrapper>
        <TipTitle>{tip.title}</TipTitle>
        <Desc>{tip.desc}</Desc>
      </TipWrapper>
    </Section>
  );
};

export default TipsSection;
