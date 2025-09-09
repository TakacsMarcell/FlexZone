import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";

const Grid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4px;
`;

const Masonry = styled.div`
  display: grid;
  /* fix kártya szélesség és középre igazítás */
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  gap: 28px;
  justify-content: center;   /* teljes rács középre */
  justify-items: center;     /* kártyák cellán belül középen */

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 20px;
    justify-content: stretch;
    justify-items: stretch;
  }
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            String(item[key] ?? "")
              .toLowerCase()
              .includes(String(value).toLowerCase())
          )
        )
      );
    }
  }, [products, cat, filters]);

  useEffect(() => {
    setFilteredProducts((prev) => {
      const arr = cat ? [...prev] : [...products];
      if (sort === "newest") {
        return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sort === "asc") {
        return arr.sort((a, b) => b.price - a.price); 
      } else {
        return arr.sort((a, b) => a.price - b.price); 
      }
    });
  }, [sort, products, cat]);

  const list = cat ? filteredProducts : products.slice(0, 8);

  return (
    <Grid>
      <Masonry>
        {list.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </Masonry>
    </Grid>
  );
};

export default Products;
