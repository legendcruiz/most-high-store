import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { fallbackProducts } from "../data/fallbackProducts";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (!error && data?.length) {
        setProducts(data || []);
      } else {
        setProducts(fallbackProducts);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        search,
        setSearch,
        category,
        setCategory,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
