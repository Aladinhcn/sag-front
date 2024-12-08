import { useState } from "react";
import { fetchSearchResults } from "../utils/api";

export const useAppState = () => {
  const [isNavAnimationComplete, setIsNavAnimationComplete] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);

  const fetchData = async (query) => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchSearchResults(query);
      if (!result.books.length) {
        setError(true);
        setDisplayTable(false);
      }else {
        setData(result);
        setDisplayTable(true);
      }
    } catch (error) {
      setError(true);
      setDisplayTable(false);
    } finally {
      setIsNavAnimationComplete(false);
      setLoading(false);
    }
  };

  return {
    isNavAnimationComplete,
    setIsNavAnimationComplete,
    data,
    fetchData,
    loading,
    displayTable,
    error,
    setDisplayTable,
  };
};
