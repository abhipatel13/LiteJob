
import { useState, useEffect } from 'react';
import axios from 'axios'; 

const useBusinessDataFetching = (url) => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setBusinessData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Any clean-up code if necessary
    };
  }, [url]);

  return { businessData, loading, error };
};

export default useBusinessDataFetching;
