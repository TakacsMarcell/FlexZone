import styled from "styled-components";
import { mobile } from "../responsive";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import background from '../images/background.png';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    width: "100vw",
    height: "100vh",
    padding: "10px",
  })}
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  ${mobile({
    width: "85%",
    padding: "20px",
    borderRadius: "12px",
  })}
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 400;
  color: #333;
  margin-bottom: 10px;
  text-align: center;

  ${mobile({ fontSize: "22px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Input = styled.input`
  width: 85%;
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;

  ${mobile({ width: "95%", padding: "10px" })}
`;

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 14px 20px;
  background-color: #65C466;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;

  transition: all 0.3s ease;
  &:hover { background-color: #4DAA52; }

  ${mobile({ width: "70%", padding: "12px", fontSize: "15px" })}
`;

const StyledLink = styled(RouterLink)`
  margin-top: 12px;
  font-size: 14px;
  text-decoration: underline;
  color: #65C466;
  cursor: pointer;

  ${mobile({ fontSize: "12px" })}
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>BEJELENTKEZÉS</Title>
        <Form>
          <Input required placeholder="Felhasználónév" onChange={(e) => setUsername(e.target.value)} />
          <Input required type="password" placeholder="Jelszó" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick}>BEJELENTKEZÉS</Button>
          {error && <ErrorMessage>Hibás felhasználónév vagy jelszó!</ErrorMessage>}
          <StyledLink to="/forgot-password">Elfelejtetted a jelszavad?</StyledLink>
          <StyledLink to="/register">REGISZTRÁCIÓ</StyledLink>
        </Form>
        <StyledLink to="/">VISSZA A FŐOLDALRA</StyledLink>
      </Wrapper>
    </Container>
  );
};

export default Login;
