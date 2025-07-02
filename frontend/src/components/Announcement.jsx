import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #65c466;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Ingyenes edzéstervek 2026 november 31-ig!</Container>;
};

export default Announcement;