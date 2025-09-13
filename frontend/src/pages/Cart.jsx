import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, increaseQuantity, decreaseQuantity, removeProduct } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const colors = {
  green: "#65C466",
  lightGray: "#D3D3D3",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
  silver: "#A9A9A9",
};

const KEY = "pk_test_51S1AMb4lrHAVJesJ2QNVBkAiL5UlGQXiwWKwYybOlVRvwag4vQ4QOtZMSeshvaHEMVFCCSyzQQdhQJ8LPBYAPkLq00uqxBjJRy";

const Container = styled.div``;

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${colors.black}, ${colors.green});
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color: ${colors.white};
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  flex-wrap: wrap;
`;

const TopButton = styled.button`
  padding: 12px 24px;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.type === "filled" ? colors.green : "transparent"};
  color: ${(props) => (props.type === "filled" ? colors.black : colors.white)};
  border: ${(props) =>
    props.type === "filled" ? "none" : `2px solid ${colors.green}`};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
    transform: scale(1.03);
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
  ${mobile({
    flexDirection: "column",
    alignItems: "stretch",
  })}
`;

const Info = styled.div`
  flex: 3;
  width: 100%;
  box-sizing: border-box;
  color: ${colors.white};
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
  padding: 20px;
  background-color: ${colors.darkGray};
  border-radius: 16px;
  box-sizing: border-box;
  ${mobile({
    flexDirection: "column",
    padding: "15px",
  })}
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  min-width: 0;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
  })}
`;

const Image = styled.img`
  width: 200px;
  max-width: 100%;
  border-radius: 10px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  word-break: break-word;
  ${mobile({ padding: "10px 0", alignItems: "center", textAlign: "center" })}
`;

const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  ${mobile({ marginTop: "10px" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background-color: ${colors.green};
  border: none;
  padding: 5px 10px;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background-color: green;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: ${colors.lightGray};
  border: none;
  height: 1px;
`;

const EmptyWrapper = styled.div`
  text-align: center;
  padding: 100px 20px;
  background-color: ${colors.darkGray};
  border-radius: 16px;
  margin: 40px 0;
`;

const EmptyText = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.lightGray};
`;

const Summary = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: ${colors.darkGray};
  border-radius: 16px;
  padding: 20px;
  color: ${colors.white};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  height: fit-content;
  box-sizing: border-box;
  ${mobile({
    width: "100%",
    marginTop: "30px",
    alignSelf: "center",
  })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "700"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${colors.green};
  color: ${colors.black};
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.white};
    transform: scale(1.02);
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });

        history.replace("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history, cart]);

  const handleDelete = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>KOSÁR</Title>
        <Top>
          <Link to="/webshop">
            <TopButton>VÁSÁRLÁS FOLYTATÁSA</TopButton>
          </Link>
          <TopButton onClick={handleDelete} type="filled">
            KOSÁR TÖRLÉSE
          </TopButton>
        </Top>

        {cart.total === 0 ? (
          <EmptyWrapper>
            <EmptyText>A kosarad jelenleg üres</EmptyText>
          </EmptyWrapper>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Termék neve:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>Termék azonosító:</b> {product._id}
                      </ProductId>
                      {product.title.toLowerCase().includes("edzésterv") ? null : (
                        <ProductSize>
                          <b>Választott mennyiség:</b> {product.quantitygram}
                        </ProductSize>
                      )}
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <QuantityButton onClick={() => dispatch(decreaseQuantity(product._id))}>-</QuantityButton>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <QuantityButton onClick={() => dispatch(increaseQuantity(product._id))}>+</QuantityButton>
                    </ProductAmountContainer>
                    <ProductPrice>
                      {product.price * product.quantity} Ft
                    </ProductPrice>
                    <RemoveButton onClick={() => dispatch(removeProduct(product._id))}>
                      Törlés
                    </RemoveButton>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>RENDELÉS ÖSSZEGZÉSE</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>TERMÉKEK ÁRA</SummaryItemText>
                <SummaryItemPrice>{cart.total} Ft</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>SZÁLLÍTÁSI DÍJ</SummaryItemText>
                <SummaryItemPrice>0 Ft</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>TELJES ÁR</SummaryItemText>
                <SummaryItemPrice>{cart.total} Ft</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="FLEXZONE"
                image="/images/flexzone_circle.png"
                billingAddress
                shippingAddress
                description={`A végösszeg ${cart.total} Ft`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
                currency="HUF"
              >
                <Button>MEGRENDELÉS</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
