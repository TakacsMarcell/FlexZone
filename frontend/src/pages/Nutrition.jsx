import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

const colors = {
  green: "#65C466",
  lightGray: "#D3D3D3",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
  silver: "#A9A9A9",
};

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${colors.black}, ${colors.green});
  min-height: 100vh;
`;

const Container = styled.div`
  padding: 60px 20px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.white};
  font-size: 3rem;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: ${colors.darkGray};
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  color: ${colors.white};

  &:hover {
    transform: scale(1.05);
    background-color: #2c2c2c;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.75);
  }
`;

const Subtitle = styled.h2`
  color: ${colors.green};
  font-size: 1.8rem;
  margin-bottom: 15px;
`;

const InfoList = styled.ul`
  text-align: left;
  color: ${colors.white};
  line-height: 1.6;
  padding: 0;
  list-style: none;
`;

const InfoItem = styled.li`
  margin-bottom: 8px;
`;

const Section = styled.div`
  margin: 60px 0;
  position: relative;
  height: 350px;
  background: url(${(props) => props.bg}) center/cover no-repeat;
  border-radius: 12px;
  overflow: hidden;
`;

const SectionOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  inset: 0;
`;

const SectionContent = styled.div`
  position: relative;
  color: ${colors.white};
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
`;

const InfoButton = styled.button`
  background-color: ${colors.green};
  color: ${colors.white};
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4ea850;
  }
`;

const ModalListTitle = styled.h5`
  margin: 16px 0 8px;
  color: ${colors.white};
  font-size: 1.05rem;
`;

const ModalList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: ${colors.lightGray};
  line-height: 1.6;
`;

const BlockTitle = styled.h2`
  text-align: center;
  color: ${colors.white};
  font-size: 2rem;
  margin: 50px 0 20px;
  opacity: 0.95;
`;

const Hint = styled.p`
  text-align: center;
  color: ${colors.lightGray};
  margin: -10px 0 30px;
  font-size: 0.95rem;
`;

const Strong = styled.span`
  color: ${colors.green};
  font-weight: 700;
`;

const Nutrition = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [calorieNeeds, setCalorieNeeds] = useState({
    maintenance: 0,
    weightLoss: 0,
    weightGain: 0,
  });

  const [macros, setMacros] = useState({
    maintenance: { protein: 0, carbs: 0, fats: 0 },
    weightLoss: { protein: 0, carbs: 0, fats: 0 },
    weightGain: { protein: 0, carbs: 0, fats: 0 },
  });

  const [targetDaily, setTargetDaily] = useState({
    m3: null,
    m6: null,
    y1: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const nutritionData = {
    protein: {
      title: "Fehérjék",
      description:
        "A fehérjék elengedhetetlenek az izomtömeg fenntartásához, az immunrendszer megfelelő működéséhez és a sejtregenerációhoz.",
      examples: [
        "Csirkemell",
        "Tojás",
        "Lazac",
        "Pulyka",
        "Görög joghurt",
        "Tehéntúró",
        "Lencse",
        "Tofu",
        "Fekete bab",
        "Földimogyoró",
      ],
    },
    carbs: {
      title: "Szénhidrátok",
      description:
        "A szénhidrátok a legfontosabb energiaforrások. A komplex szénhidrátok lassabban szabadítanak fel energiát, így tartósan biztosítanak teljesítményt.",
      examples: [
        "Barna rizs",
        "Quinoa",
        "Édesburgonya",
        "Teljes kiőrlésű kenyér",
        "Zabpehely",
        "Kuszkusz",
        "Gyümölcsök",
        "Zöldségek",
        "Borsó",
        "Sült batáta",
      ],
    },
    fats: {
      title: "Zsírok",
      description:
        "Az egészséges zsírok segítik a hormontermelést, az agyműködést és a zsírban oldódó vitaminok felszívódását.",
      examples: [
        "Olívaolaj",
        "Avokádó",
        "Mandula",
        "Dió",
        "Lenmag",
        "Chia mag",
        "Lazac",
        "Makréla",
        "Kókuszolaj",
        "Szezámolaj",
      ],
    },
  };

  useEffect(() => {
    if (!user) return;

    const { weight, height, gender } = user;
    if (!weight || !height || !gender) return;

    const bmr =
      gender === "male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * 30
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * 30;

    const maintenance = bmr * 1.55;

    setCalorieNeeds({
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(maintenance * 0.8),
      weightGain: Math.round(maintenance * 1.2),
    });

    setMacros({
      maintenance: {
        protein: (weight * 2).toFixed(1),
        carbs: (weight * 3).toFixed(1),
        fats: (weight * 0.8).toFixed(1),
      },
      weightLoss: {
        protein: (weight * 2.2).toFixed(1),
        carbs: (weight * 2).toFixed(1),
        fats: (weight * 0.6).toFixed(1),
      },
      weightGain: {
        protein: (weight * 2.5).toFixed(1),
        carbs: (weight * 4).toFixed(1),
        fats: (weight * 1.0).toFixed(1),
      },
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const { weight, targetWeight } = user;

    if (!weight || !targetWeight || !calorieNeeds.maintenance) {
      setTargetDaily({ m3: null, m6: null, y1: null });
      return;
    }

    const kgDiff = targetWeight - weight; 
    const kcalPerKg = 7700; 
    const maint = calorieNeeds.maintenance;

    const plan = (days) => {
      const dailyDelta = (kgDiff * kcalPerKg) / days; 
      const target = maint + dailyDelta;
      return Math.round(target);
    };

    setTargetDaily({
      m3: plan(90),   
      m6: plan(180),  
      y1: plan(365),  
    });
  }, [user, calorieNeeds.maintenance]);

  const openModal = (type) => {
    setCurrentSection(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Container>
          <Title>Táplálkozási ajánlások</Title>

          <Grid>
            {["maintenance", "weightLoss", "weightGain"].map((type) => (
              <Card key={type}>
                <Subtitle>
                  {type === "maintenance"
                    ? "Súlytartás"
                    : type === "weightLoss"
                    ? "Fogyás"
                    : "Tömegnövelés"}
                </Subtitle>
                <InfoList>
                  <InfoItem>Kalória: {calorieNeeds[type]} kcal</InfoItem>
                  <InfoItem>Fehérje: {macros[type].protein} g</InfoItem>
                  <InfoItem>Szénhidrát: {macros[type].carbs} g</InfoItem>
                  <InfoItem>Zsír: {macros[type].fats} g</InfoItem>
                </InfoList>
              </Card>
            ))}
          </Grid>

          <BlockTitle>Cél testsúly eléréséhez javasolt napi kalóriák</BlockTitle>
          <Hint>
            A számítás <Strong>~7700 kcal / kg</Strong> becslésen alapul, és a jelenlegi fenntartó
            kalóriádból (<Strong>{calorieNeeds.maintenance || "—"} kcal</Strong>) indul ki.
          </Hint>

          <Grid>
            <Card>
              <Subtitle>3 hónap (≈ 90 nap)</Subtitle>
              <InfoList>
                <InfoItem>
                  Napi cél: <Strong>{targetDaily.m3 !== null ? `${targetDaily.m3} kcal` : "—"}</Strong>
                </InfoItem>
              </InfoList>
            </Card>

            <Card>
              <Subtitle>6 hónap (≈ 180 nap)</Subtitle>
              <InfoList>
                <InfoItem>
                  Napi cél: <Strong>{targetDaily.m6 !== null ? `${targetDaily.m6} kcal` : "—"}</Strong>
                </InfoItem>
              </InfoList>
            </Card>

            <Card>
              <Subtitle>1 év (≈ 365 nap)</Subtitle>
              <InfoList>
                <InfoItem>
                  Napi cél: <Strong>{targetDaily.y1 !== null ? `${targetDaily.y1} kcal` : "—"}</Strong>
                </InfoItem>
              </InfoList>
            </Card>
          </Grid>

          <Section bg="https://content.dhhs.vic.gov.au/sites/default/files/2022-01/protein_0.jpg">
            <SectionOverlay />
            <SectionContent>
              <SectionTitle>Fehérjék</SectionTitle>
              <SectionText>Fontos az izomregenerációhoz és növekedéshez.</SectionText>
              <InfoButton onClick={() => openModal("protein")}>Részletek</InfoButton>
            </SectionContent>
          </Section>

          <Section bg="https://www.mindpumpmedia.com/hubfs/shutterstock_731206732.png">
            <SectionOverlay />
            <SectionContent>
              <SectionTitle>Szénhidrátok</SectionTitle>
              <SectionText>Energiaforrás, mely segíti az állóképességet.</SectionText>
              <InfoButton onClick={() => openModal("carbs")}>Részletek</InfoButton>
            </SectionContent>
          </Section>

          <Section bg="https://images.healthshots.com/healthshots/en/uploads/2023/09/02111527/fats-1-1600x900.jpg">
            <SectionOverlay />
            <SectionContent>
              <SectionTitle>Zsírok</SectionTitle>
              <SectionText>Fontosak a hormonok és a szív egészsége szempontjából.</SectionText>
              <InfoButton onClick={() => openModal("fats")}>Részletek</InfoButton>
            </SectionContent>
          </Section>
        </Container>

        {showModal && currentSection && (
          <Modal
            title={nutritionData[currentSection].title}
            message={nutritionData[currentSection].description}
            onClose={closeModal}
          >
            <ModalListTitle>Ajánlott ételek:</ModalListTitle>
            <ModalList>
              {nutritionData[currentSection].examples.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ModalList>
          </Modal>
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Nutrition;
