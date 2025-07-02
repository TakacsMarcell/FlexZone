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

const Container = styled.footer`
  background-color: #f1f1f1;
  display: flex;
  flex-wrap: wrap;
  padding: 40px 60px;
  color: #333;
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
  color: #65C466;
  text-shadow: 1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black;
`;

const Desc = styled.p`
  margin: 20px 0;
  font-size: 14px;
  line-height: 1.6;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => `#${props.color}`};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h3`
  margin-bottom: 25px;
  font-size: 18px;
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
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #65C466;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
`;

const Payment = styled.img`
  width: 60%;
  margin-top: 10px;
`;

const Footer = () => {
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
          <SocialIcon
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            color="3B5999"
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            color="E4405F"
          >
            <Instagram />
          </SocialIcon>
          <SocialIcon
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            color="55ACEE"
          >
            <Twitter />
          </SocialIcon>
          <SocialIcon
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            color="E60023"
          >
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Section>

      <Section>
        <Title>Hasznos linkek</Title>
        <GridList>
          <GridItem><Link to="/">Főoldal</Link></GridItem>
          <GridItem><Link to="/">Fehérjék</Link></GridItem>
          <GridItem><Link to="/">Kreatinok</Link></GridItem>
          <GridItem><Link to="/">Vitaminok</Link></GridItem>
          <GridItem><Link to="/">Kosár</Link></GridItem>
          <GridItem><Link to="/login">Bejelentkezés</Link></GridItem>
          <GridItem><Link to="/register">Regisztráció</Link></GridItem>
        </GridList>
      </Section>

      <Section>
        <Title>Kapcsolat</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px", color: "#65C466" }} />
          9024 Győr, Kossuth Lajos utca 1.
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px", color: "#65C466" }} />
          +36 30 666 6666
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px", color: "#65C466" }} />
          flexzone@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Section>
    </Container>
  );
};

export default Footer;
