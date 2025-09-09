import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { Link } from 'react-router-dom';

const Container = styled.div``;

const SliderContainer = styled.div`
  width: 100%;
  height: 60vh; 
  display: flex;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 50vh; 
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  transition: all 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw); 
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw; 
  height: 100%;
  background: linear-gradient(to bottom, #000000, #65C466);
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Image = styled.img`
  width: 80%;      
  max-width: 400px;
  height: auto;    
  max-height: 400px;

  @media (max-width: 768px) {
    width: 90%;    
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 20px; 
  }
`;

const Title = styled.h1`
  font-size: 48px;

  @media (max-width: 768px) {
    font-size: 24px; 
  }
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 16px; 
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #65c466;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4ca24f;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2); 
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <SliderContainer>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          <Slide bg="#f5f5f5">
            <ImgContainer>
              <Image src="https://www.scitecshop.hu/uploads/product/2427/8MyPfpIF.png" />
            </ImgContainer>
            <InfoContainer>
              <Title>Mások ezt választják</Title>
              <Desc>Kreatin monohidrát</Desc>
              <Link to="product/68b0980280c3b1231f8ca3a2">
              <Button>Ugrás a termékhez</Button>
              </Link>
            </InfoContainer>
          </Slide>
          <Slide bg="#f0f0f0">
            <ImgContainer>
              <Image src="https://scitec.hu/images/product_images/4810_2275fdf657a2.webp" />
            </ImgContainer>
            <InfoContainer>
              <Title>Mások ezt választják</Title>
              <Desc>Whey fehérje</Desc>
              <Link to="product/68bffd228f061c31d275eeb9">
              <Button>Ugrás a termékhez</Button>
              </Link>
            </InfoContainer>
          </Slide>
          <Slide bg="#e0e0e0">
            <ImgContainer>
              <Image src="https://shop.biotechusa.hu/cdn/shop/files/Multivitamin_ForMen_60tabs_250ml_600x600_1d94d60f-6704-4693-9250-053935dafa1a_grande.png?v=1718715272" />
            </ImgContainer>
            <InfoContainer>
              <Title>Mások ezt választják</Title>
              <Desc>Multivitamin férfiaknak</Desc>
              <Link to="product/68bffe258f061c31d275eec4">
              <Button>Ugrás a termékhez</Button>
              </Link>
            </InfoContainer>
          </Slide>
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </SliderContainer>
      <Categories/>
      <Footer/>
    </Container>
  );
};

export default Slider;
