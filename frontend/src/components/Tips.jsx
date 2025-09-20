import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Section = styled.section`
  background: #000; /* sima fekete háttér */
  padding: 60px 20px;
  text-align: center;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #65C466; /* zöld cím */
  margin-bottom: 20px;
`;

const TipTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #fff;
`;

const Desc = styled.p`
  font-size: 1.1rem;
  color: #d3d3d3; /* világosszürke leírás */
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TipsSection = () => {
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tips");
        if (res.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.data.length);
          setTip(res.data[randomIndex]);
        }
      } catch (err) {
        console.error("Hiba a tippek betöltésekor:", err);
      }
    };
    fetchTips();
  }, []);

  if (!tip) {
    return (
      <Section>
        <p>Betöltés...</p>
      </Section>
    );
  }

  return (
    <Section>
      <Title>Mai jótanács</Title>
      <TipTitle>{tip.title}</TipTitle>
      <Desc>{tip.desc}</Desc>
    </Section>
  );
};

export default TipsSection;
