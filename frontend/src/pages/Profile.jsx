import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import { loginSuccess } from "../redux/userRedux";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const colors = {
  green: "#65C466",
  lightGray: "#D3D3D3",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
  silver: "#A9A9A9",
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${colors.black}, ${colors.green});
  min-height: 100vh;
`;

const Container = styled.div`
  padding: 60px 20px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Card = styled.div`
  background: ${colors.darkGray};
  border-radius: 16px;
  padding: 50px;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 40px;
  animation: ${fadeIn} 0.8s ease;
  color: ${colors.white};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: ${colors.green};
  color: ${colors.black};
  font-size: 64px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(101, 196, 102, 0.7);
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 32px;
  color: ${colors.white};
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: ${colors.lightGray};
  font-size: 16px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${colors.lightGray};
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.white};
  border: 2px solid ${colors.silver};
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: ${colors.green};
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    color: #aaa;
    border-style: dashed;
  }
`;

const Select = styled.select`
  padding: 14px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.white};
  border: 2px solid ${colors.silver};
  appearance: none;

  option {
    background-color: ${colors.darkGray};
    color: ${colors.white};
  }

  &:focus {
    outline: none;
    border-color: ${colors.green};
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SaveButton = styled.button`
  grid-column: 1 / -1;
  margin-top: 30px;
  padding: 16px;
  background-color: ${colors.green};
  color: ${colors.black};
  border: none;
  font-size: 18px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
    transform: scale(1.03);
  }
`;

const StatBoxContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatBox = styled.div`
  background-color: ${colors.black};
  color: ${colors.green};
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const Quote = styled.div`
  font-style: italic;
  font-size: 16px;
  color: #444;
  text-align: center;
  margin-bottom: -20px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [profileData, setProfileData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    weight: user?.weight ?? "",
    height: user?.height ?? "",
    gender: user?.gender ?? "",
    targetWeight: user?.targetWeight ?? "", 
    createdAt: user?.createdAt || "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.username,
        email: user.email,
        weight: user.weight ?? "",
        height: user.height ?? "",
        gender: user.gender ?? "",
        targetWeight: user.targetWeight ?? "",
        createdAt: user.createdAt,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toNumberOrNull = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const num = Number(v);
    return Number.isFinite(num) ? num : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        weight: toNumberOrNull(profileData.weight),
        height: toNumberOrNull(profileData.height),
        targetWeight: toNumberOrNull(profileData.targetWeight),
        gender: profileData.gender || null,
      };

      const res = await userRequest.put(`/users/${user._id}`, payload);
      dispatch(loginSuccess(res.data)); 
      setShowModal(true);
    } catch (error) {
      console.error("Hiba a mentés során:", error);
    }
  };

  const firstLetter = profileData.name?.charAt(0)?.toUpperCase() || "U";
  const registrationDate = profileData.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString("hu-HU")
    : "-";

  return (
    <>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Container>
          <Quote>„A legjobb befektetés, amit tehetsz: magadba.”</Quote>

          <StatBoxContainer>
            <StatBox>Tagság kezdete: {registrationDate}</StatBox>
            <StatBox>
              Cél testsúly: {user?.targetWeight
                ? `${user.targetWeight} kg`
                : "N/A"}
            </StatBox>
          </StatBoxContainer>

          <Card>
            <Header>
              <Avatar>{firstLetter}</Avatar>
              <Info>
                <Name>{profileData.name}</Name>
                <Description>
                  Üdvözlünk a profilodban! Frissítheted a fizikai adataid, és még többet megtudhatsz magadról.
                </Description>
              </Info>
            </Header>

            <Form onSubmit={handleSubmit}>
              <FormItem>
                <Label>Név</Label>
                <Input type="text" name="name" value={profileData.name} disabled />
              </FormItem>
              <FormItem>
                <Label>E-mail</Label>
                <Input type="email" name="email" value={profileData.email} disabled />
              </FormItem>
              <FormItem>
                <Label>Testsúly (kg)</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  name="weight"
                  value={profileData.weight}
                  onChange={handleInputChange}
                  placeholder="Pl. 75"
                />
              </FormItem>
              <FormItem>
                <Label>Magasság (cm)</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  name="height"
                  value={profileData.height}
                  onChange={handleInputChange}
                  placeholder="Pl. 180"
                />
              </FormItem>
              <FormItem>
                <Label>Cél testsúly (kg)</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  name="targetWeight"
                  value={profileData.targetWeight}
                  onChange={handleInputChange}
                  placeholder="Pl. 70"
                />
              </FormItem>
              <FormItem>
                <Label>Nem</Label>
                <Select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Válassz nemet</option>
                  <option value="male">Férfi</option>
                  <option value="female">Nő</option>
                  <option value="other">Egyéb</option>
                </Select>
              </FormItem>
              <SaveButton type="submit">Adatok mentése</SaveButton>
            </Form>
          </Card>
        </Container>
      </Wrapper>
      <Footer />
      {showModal && (
        <Modal
          title="Siker"
          message="A profilod frissítve lett!"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Profile;
