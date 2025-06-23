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
  
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
    text-align: justify
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    @media only screen and (max-width: 768px) {
      display: block;
    }
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    @media only screen and (max-width: 768px) {
      background-color: #fff8f8;
    }
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
    width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>FLEXZONE</Logo>
          <Desc>
          Válogass magas minőségű étrend-kiegészítők közül, nézd meg személyre 
          szabott edzésterveinket, és kérj szakértői táplálkozási tanácsokat, 
          hogy elérd a kitűzött céljaidat. Legyen szó akár teljesítményfokozásról, egészségmegőrzésről. 
          Kezdd el még ma az életmódváltást!
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Hasznos linkek</Title>
          <List>
            <ListItem>
              <Link to='/' style={{textDecoration:"none", color:"black"}}>
                Főoldal
              </Link>       
            </ListItem>
            <ListItem>
              <Link to='/' style={{textDecoration:"none", color:"black"}}>
                Feherjék
              </Link>       
            </ListItem>
            <ListItem>
              <Link to='/' style={{textDecoration:"none", color:"black"}}>
                Kreatinok
              </Link>       
            </ListItem>
            <ListItem>
              <Link to='/' style={{textDecoration:"none", color:"black"}}>
                Vitaminok
              </Link>       
            </ListItem>  
            <ListItem>
              <Link to='/' style={{textDecoration:"none", color:"black"}}>
                Kosár
              </Link>       
            </ListItem> 
          </List>
        </Center>
        <Right>
          <Title>Kapcsolat</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 9024 Győr , Kossuth Lajos utca 1. 
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +36 30 666 6666
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> flexzone@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;
  