import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const colors = {
  green: "#65C466",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
  lightGray: "#cccccc",
  silver: "#A9A9A9",
};

const Container = styled.footer`
  background: black;
  color: ${colors.lightGray};
  display: flex;
  flex-wrap: wrap;
  padding: 40px 60px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

const Section = styled.div`
  flex: 1;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 28px;
  color: ${colors.green};
  text-shadow:
    1px 1px 0 ${colors.black},
    -1px -1px 0 ${colors.black},
    1px -1px 0 ${colors.black},
    -1px 1px 0 ${colors.black};
`;

const Desc = styled.p`
  margin: 20px 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.lightGray};
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${colors.white};
  background-color: ${(props) => `#${props.color}`};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  text-decoration: none;
  box-shadow: 0 0 8px rgba(0,0,0,0.6);

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
  }
`;

const Title = styled.h3`
  margin-bottom: 25px;
  font-size: 18px;
  color: ${colors.green};
`;

const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

const GridItem = styled.div`
  font-size: 14px;

  a {
    text-decoration: none;
    color: ${colors.lightGray};
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.green};
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: ${colors.lightGray};

  svg {
    margin-right: 10px;
    color: ${colors.green};
  }
`;

const Payment = styled.img`
  width: 60%;
  margin-top: 10px;
  filter: brightness(0.9);
`;

const Footer = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Section>
        <Logo>FLEXZONE</Logo>
        <Desc>
          Válogass magas minőségű étrend-kiegészítők közül, nézd meg személyre
          szabott edzésterveinket, és kérj szakértői táplálkozási tanácsokat,
          hogy elérd a kitűzött céljaidat. Kezdd el még ma az életmódváltást!
        </Desc>
        <SocialContainer>
          <SocialIcon href="https://www.facebook.com/profile.php?id=61580430430051" target="_blank" rel="noopener noreferrer" color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon href="https://www.instagram.com/flexzonehun/" target="_blank" rel="noopener noreferrer" color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon href="https://x.com/FlexZoneHun" target="_blank" rel="noopener noreferrer" color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon href="https://hu.pinterest.com/flexzonehun/" target="_blank" rel="noopener noreferrer" color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Section>

      <Section>
        <Title>Hasznos linkek</Title>
        <GridList>
          <GridItem><Link to="/">Főoldal</Link></GridItem>
          <GridItem><Link to="/products/feherje">Fehérjék</Link></GridItem>
          <GridItem><Link to="/products/kreatin">Kreatinok</Link></GridItem>
          <GridItem><Link to="/products/vitamin">Vitaminok</Link></GridItem>
          <GridItem><Link to="/cart">Kosár</Link></GridItem>

          {!user && (
            <>
              <GridItem><Link to="/login">Bejelentkezés</Link></GridItem>
              <GridItem><Link to="/register">Regisztráció</Link></GridItem>
            </>
          )}
        </GridList>
      </Section>

      <Section>
        <Title>Kapcsolat</Title>
        <ContactItem>
          <Room /> 9024 Győr, Kossuth Lajos utca 1.
        </ContactItem>
        <ContactItem>
          <Phone /> +36 30 666 6666
        </ContactItem>
        <ContactItem>
          <MailOutline /> flexzone@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Fizetési módok" />
      </Section>
    </Container>
  );
};

export default Footer;
