import styled from "styled-components";
import { categories } from "../data";
import { Link } from "react-router-dom";

const colors = {
  lightGray: "#D3D3D3", 
  silver: "#A9A9A9",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1a1a1a", 
  gradientStart: "#2c2c2c",
  gradientEnd: "#6e6e6e",
};

const Container = styled.div`
  background: ${colors.darkGray};
  min-height:70vh;
  padding: 60px 20px;
`;

const Title = styled.h2`
  color: ${colors.white};
  text-align: center;
  font-size: 40px;
  margin-bottom: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
`;

const Card = styled.div`
  background: linear-gradient(to bottom, ${colors.lightGray}, ${colors.darkGray});
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 22rem;
  background: linear-gradient(to bottom, ${colors.darktGray}, ${colors.lightGray});
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  object-fit: contain;
`;

const Info = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
`;

const CategoryName = styled.h3`
  font-size: 22px;
  margin-bottom: 12px;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${colors.lightGray};
  line-height: 1.5;
`;

const StyledButton = styled(Link)`
  align-self: center;
  padding: 12px 24px;
  background-color: ${colors.white};
  color: ${colors.black};
  font-weight: bold;
  font-size: 14px;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.lightGray};
    color: ${colors.black};
    transform: translateY(-2px);
  }
`;

const Categories = () => {
  return (
    <Container>
      <Title>Kategóriák</Title>
      <Grid>
        {categories.map((item) => (
          <Card key={item.id}>
            <ImageWrapper>
              <Image src={item.img} alt={item.title} />
            </ImageWrapper>
            <Info>
              <CategoryName>{item.title}</CategoryName>
              <Description>{item.desc}</Description>
              <StyledButton to={`/products/${item.cat}`}>
                Felfedezés
              </StyledButton>
            </Info>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
