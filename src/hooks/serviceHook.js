
import { useState, useEffect } from 'react';
import axios from 'axios'; 

const useServiceDataFetching = (url) => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setServiceData(response.data);
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
  }, []);

  return { serviceData, loading, error };
};

export default useServiceDataFetching;
