export const fetchSearchResults = async (query) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
