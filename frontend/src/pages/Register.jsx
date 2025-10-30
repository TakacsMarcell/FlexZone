import styled from "styled-components";
import { mobile } from "../responsive";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import background from '../images/background.png';
import Modal from "../components/Modal"; 

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
  width: 40%;
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
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 15px 10px 0 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;

  ${mobile({
    minWidth: "90%",
    margin: "10px 0",
    padding: "10px",
  })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align: center;
  color: #555;
  line-height: 1.4;

  ${mobile({ fontSize: "11px" })}
`;

const LinkText = styled.span`
  font-weight: bold;
  color: #65C466;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #4DAA52;
  }
`;

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 14px 20px;
  background-color: #65C466;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4DAA52;
  }

  ${mobile({
    width: "70%",
    padding: "12px",
    fontSize: "15px",
  })}
`;

const StyledLink = styled(RouterLink)`
  margin-top: 15px;
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

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("A jelszavak nem egyeznek.");
      return;
    }
    try {
      const res = await publicRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log("Sikeres regisztráció:", res.data);
      history.push("/login");
    } catch (err) {
      setError("Hiba történt a regisztráció során.");
      console.error(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>REGISZTRÁCIÓ</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Felhasználónév"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Jelszó"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Jelszó megerősítése"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            A fiók létrehozásával hozzájárulok személyes adataim feldolgozásához.{" "}
            <LinkText onClick={() => setIsModalOpen(true)}>
              ADATKEZELÉSI TÁJÉKOZTATÓ
            </LinkText>
          </Agreement>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">REGISZTRÁCIÓ</Button>
        </Form>
        <StyledLink to="/">VISSZA A FŐOLDALRA</StyledLink>
      </Wrapper>

      {isModalOpen && (
        <Modal
          title="Adatkezelési Tájékoztató"
          onClose={() => setIsModalOpen(false)}
        >
          <p>
            Az Ön személyes adatait a vonatkozó adatvédelmi jogszabályoknak
            megfelelően kezeljük. Az adatkezelés célja a felhasználói fiók
            létrehozása és a szolgáltatás nyújtása. Az adatok kezelője a weboldal
            üzemeltetője.
          </p>
          <p>
            Az adatokhoz kizárólag a szolgáltatás működéséhez szükséges személyek
            férhetnek hozzá. Az adatokat harmadik félnek nem adjuk át, kivéve ha
            azt jogszabály előírja.
          </p>
          <p>
            Önnek jogában áll adataihoz hozzáférni, azokat módosítani, törölni
            vagy az adatkezelés korlátozását kérni az üzemeltetőnél.
          </p>
        </Modal>
      )}
    </Container>
  );
};

export default Register;
