import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #000;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.8s ease;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
  transition: transform 1.2s ease;
  transform: scale(${(props) => (props.active ? 1.05 : 1)});
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  max-width: 80%;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Desc = styled.p`
  font-size: 1.1rem;
  color: #eee;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#65c466" : "#999")};
  cursor: pointer;
`;

const VisualSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <Container>
      {sliderItems.map((item, i) => (
        <Slide key={item.id} active={i === index}>
          <ImageWrapper>
            <Image src={item.img} alt={item.title} active={i === index} />
          </ImageWrapper>
          <TextOverlay>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </TextOverlay>
        </Slide>
      ))}

      <Dots>
        {sliderItems.map((_, i) => (
          <Dot key={i} active={i === index} onClick={() => setIndex(i)} />
        ))}
      </Dots>
    </Container>
  );
};

export default VisualSlider;
