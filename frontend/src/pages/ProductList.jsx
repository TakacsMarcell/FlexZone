import styled, { createGlobalStyle } from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router";
import { useState } from "react";

const GlobalFix = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body { max-width: 100%; overflow-x: hidden; }
`;

const colors = {
  green: "#65C466",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1c1c1c",
  silver: "#A9A9A9",
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, ${colors.black}, ${colors.green});
  color: ${colors.white};
`;

const Content = styled.div`
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 16px 32px;

  @media (min-width: 768px) {
    padding: 24px 20px 40px;
  }
`;

const FilterBar = styled.div`
  width: 100%;
  background: ${colors.darkGray};
  padding: 12px 14px;
  border-radius: 12px;
  margin: 8px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  box-shadow: 0 6px 20px rgba(0,0,0,0.5);
  box-sizing: border-box;      /* ne lógjon ki a padding miatt */
  overflow: hidden;            /* subpixel overflow ellen */

  @media (min-width: 1024px) {
    padding: 14px 20px;
    gap: 16px;
    margin: 12px 0 32px;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  /* rugalmas alap-szélesség, ne kényszerítse túl a sort */
  flex: 1 1 360px;

  &.right {
    flex: 1 1 220px;
    justify-content: flex-end;
  }

  @media (max-width: 900px) {
    flex: 1 1 100%;
    justify-content: flex-start;

    &.right {
      justify-content: flex-start;
    }
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  /* nagyon kis kijelzőn külön sorba engedjük */
  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid ${colors.silver};
  background: rgba(255,255,255,0.08);
  color: ${colors.white};
  font-size: 14px;
  cursor: pointer;
  transition: border-color .2s, background-color .2s;
  min-width: 150px;
  max-width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.green};
    background: rgba(255,255,255,0.16);
  }

  option {
    background: ${colors.darkGray};
    color: ${colors.white};
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
  }
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    if (
      value === "Márka" ||
      value === "Fehérje tipusa" ||
      value === "Kreatin tipusa" ||
      value === "Vitamin tipusa"
    ) {
      const next = { ...filters };
      if (e.target.name === "brand") delete next.brand;
      if (e.target.name === "type") delete next.type;
      setFilters(next);
    } else {
      setFilters({ ...filters, [e.target.name]: value });
    }
  };

  return (
    <PageContainer>
      <GlobalFix />
      <Announcement />
      <Navbar />

      <Content>
        <FilterBar>
          <Group>
            <Label>Szűrés:</Label>

            <Select name="brand" onChange={handleFilters} defaultValue="Márka">
              <Option value="Márka">Márka</Option>
              <Option value="Biotech">Biotech</Option>
              <Option value="Scitec">Scitec</Option>
              <Option value="Puregold">Puregold</Option>
              <Option value="GymBeam">GymBeam</Option>
            </Select>

            {cat === "feherje" && (
              <Select name="type" onChange={handleFilters} defaultValue="Fehérje tipusa">
                <Option value="Fehérje tipusa">Fehérje típusa</Option>
                <Option value="allat">Állati eredetű</Option>
                <Option value="tej">Tejsavó alapú</Option>
                <Option value="Vegán">Vegán</Option>
              </Select>
            )}

            {cat === "kreatin" && (
              <Select name="type" onChange={handleFilters} defaultValue="Kreatin tipusa">
                <Option value="Kreatin tipusa">Kreatin típusa</Option>
                <Option value="Monohidrát">Monohidrát</Option>
                <Option value="Kapszula">Kapszula</Option>
              </Select>
            )}

            {cat === "vitamin" && (
              <Select name="type" onChange={handleFilters} defaultValue="Vitamin tipusa">
                <Option value="Vitamin tipusa">Vitamin típusa</Option>
                <Option value="D3">D3</Option>
                <Option value="Multivitamin">Multivitamin</Option>
                <Option value="Kollagen">Kollagén</Option>
              </Select>
            )}
          </Group>

          <Group className="right">
            <Label>Rendezés:</Label>
            <Select onChange={(e) => setSort(e.target.value)} defaultValue="newest">
              <Option value="newest">Legújabb</Option>
              <Option value="asc">Legdrágább elöl</Option>
              <Option value="desc">Legolcsóbb elöl</Option>
            </Select>
          </Group>
        </FilterBar>

        <Products cat={cat} filters={filters} sort={sort} />
      </Content>

      <Footer />
    </PageContainer>
  );
};

export default ProductList;
