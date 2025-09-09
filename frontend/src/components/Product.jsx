import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #1c1c1c;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 30px rgba(0,0,0,0.7);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;

  ${Container}:hover & {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: #fff;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #65C466;
`;

const Product = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`} style={{ textDecoration: "none" }}>
      <Container>
        <ImageWrapper>
          <Image src={item.img} alt={item.title} />
        </ImageWrapper>
        <Info>
          <Title>{item.title}</Title>
          <Price>{item.price} Ft</Price>
        </Info>
      </Container>
    </Link>
  );
};

export default Product;
