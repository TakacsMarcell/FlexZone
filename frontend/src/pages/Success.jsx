import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import styled, { keyframes } from "styled-components";

const colors = {
  green: "#65C466",
  lightGray: "#D3D3D3",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${colors.black}, ${colors.green});
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const Card = styled.div`
  background: ${colors.darkGray};
  border-radius: 20px;
  padding: 50px 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  animation: ${fadeIn} 0.8s ease;
  color: ${colors.white};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.green};
  margin: 0;
`;

const Message = styled.p`
  font-size: 18px;
  color: ${colors.lightGray};
  line-height: 1.6;
`;

const OrderId = styled.div`
  background: ${colors.black};
  color: ${colors.green};
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 14px 28px;
  background-color: ${colors.green};
  color: ${colors.black};
  border: none;
  font-size: 18px;
  font-weight: bold;
  border-radius: 18px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
    transform: scale(1.05);
  }
`;

const Success = () => {
  const location = useLocation();
  const data = location.state?.stripeData;
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleBack = () => {
    history.push("/");
  };

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
          email: currentUser.email, // fontos az email miatt
        });

        // 🔥 Order ID azonnal megjelenik
        setOrderId(res.data._id);

        // 🔥 Kosár azonnal törlődik
        dispatch(clearCart());
      } catch (err) {
        console.error("Error creating order:", err);
      }
    };

    if (data && !orderId) {
      createOrder();
    }
  }, [data, orderId, cart, currentUser, dispatch]);

  return (
    <Wrapper>
      <Card>
        <Title>Sikeres rendelés!</Title>
        <Message>
          Köszönjük a vásárlást!
          {orderId && <><br />A rendelés azonosítója:</>}
        </Message>

        {orderId && <OrderId>{orderId}</OrderId>}

        <Button onClick={handleBack}>Vissza a főoldalra</Button>
      </Card>
    </Wrapper>
  );
};

export default Success;
