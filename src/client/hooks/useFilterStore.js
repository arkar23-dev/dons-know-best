import { useState, useEffect } from "react";
import store from "../store/index";

export default function useFilterStore() {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const handleChange = () => {
      setUpdate((prev) => prev + 1);
    };

    store.on("change", handleChange);

    return () => {
      store.off("change", handleChange);
    };
  }, []);

  return store;
}
