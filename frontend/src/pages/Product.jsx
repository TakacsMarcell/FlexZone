import { Add, Remove, ArrowBack } from "@material-ui/icons";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const GlobalFix = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { width: 100%; max-width: 100%; overflow-x: hidden; }
  img, svg, video { max-width: 100%; height: auto; }
`;

const colors = {
  green: "#65C466",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
  silver: "#A9A9A9",
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, ${colors.black}, ${colors.green});
  color: ${colors.white};
  overflow-x: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px 16px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    padding: 60px 20px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: ${colors.darkGray};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.8s ease;

  /* mindig középen, kontrollált szélesség */
  max-width: 980px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;   /* egy oszlop */
    place-items: center;          /* teljes középre igazítás */
    text-align: center;
    padding: 24px 12px 20px;
    gap: 24px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${colors.black};
  color: ${colors.white};
  border: 0;
  padding: 8px 14px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${colors.green};
    color: ${colors.black};
    transform: translateX(-4px);
  }

  @media (max-width: 900px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 520px;
  max-height: 520px;
  border-radius: 16px;
  object-fit: contain;

  @media (max-width: 900px) {
    max-width: 360px;
    max-height: 360px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;

  @media (max-width: 900px) {
    align-items: center; /* belső elemek középen mobilon */
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.white};
  margin: 0;
  word-break: break-word;
  hyphens: auto;

  @media (max-width: 900px) {
    font-size: 26px;
  }
`;

const Desc = styled.p`
  font-size: 16px;
  color: ${colors.white};
  line-height: 1.5;
  margin: 0;
  opacity: .9;
  word-break: break-word;
  hyphens: auto;
`;

const Price = styled.span`
  font-size: 30px;
  font-weight: 800;
  color: ${colors.white};
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 6px 0 2px;
  align-items: flex-start;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const FilterTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.white};
`;

const FilterSize = styled.select`
  padding: 12px;
  border-radius: 12px;
  border: 2px solid ${colors.silver};
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.white};
  font-size: 15px;

  &:focus {
    border-color: ${colors.green};
    outline: none;
  }

  option {
    background: ${colors.darkGray};
    color: ${colors.white};
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 360px;  /* ne lógjon ki */
  }
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 6px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 14px;
    justify-content: center;
    align-items: center;
  }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid ${colors.silver};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 16px 28px;
  border-radius: 20px;
  border: 2px solid ${colors.black};
  background-color: ${colors.green};
  color: ${colors.black};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
    transform: scale(1.03);
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 360px; /* CTA középen mobilon */
  }
`;

const Product = () => {
  const location = useLocation();
  const history = useHistory(); 
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [quantitygram, setQuantitygram] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        if (res.data?.quantitygram?.length > 0) {
          setQuantitygram(String(res.data.quantitygram[0])); 
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const firstQty = Number(product?.quantitygram?.[0]);
  const selectedQty = Number(quantitygram);
  const basePrice = Number(product?.price) || 0;
  const multiplier = firstQty && selectedQty ? (selectedQty / firstQty) : 1;
  const computedUnitPrice = Math.round(basePrice * multiplier);

  const handleClick = () => {
    dispatch(addProduct({
      ...product,
      price: computedUnitPrice,
      quantity,
      quantitygram
    }));
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push("/webshop");
    }
  };

  return (
    <PageContainer>
      <GlobalFix />
      <Announcement />
      <Navbar />
      <Content>
        <Wrapper>
          <BackButton onClick={handleBack}>
            <ArrowBack /> Vissza
          </BackButton>

          <ImgContainer>
            <Image src={product.img} alt={product.title} />
          </ImgContainer>

          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>{computedUnitPrice} Ft</Price>

            {product.quantitygram && product.quantitygram.length > 0 && (
              <FilterContainer>
                <Filter>
                  <FilterTitle>
                    {product.title?.toLowerCase().includes("kapszula")
                      ? "Darabszám:"
                      : "Mennyiség:"}
                  </FilterTitle>
                  <FilterSize
                    value={quantitygram}
                    onChange={(e) => setQuantitygram(e.target.value)}
                  >
                    {product.title?.toLowerCase().includes("kapszula")
                      ? product.quantitygram?.map((s) => (
                          <FilterSizeOption key={s} value={s}>
                            {s} db
                          </FilterSizeOption>
                        ))
                      : product.quantitygram?.map((s) => (
                          <FilterSizeOption key={s} value={s}>
                            {s} g
                          </FilterSizeOption>
                        ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
            )}

            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("inc")}
                />
              </AmountContainer>
              <Button onClick={handleClick}>HOZZÁADÁS A KOSÁRHOZ</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Product;
