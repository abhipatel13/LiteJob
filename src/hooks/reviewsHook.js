import { useState, useEffect } from 'react';
import axios from 'axios'; 

const useReviewsDataFetching = (url) => {
  const [reviewsData, setReviewsData] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setReviewsData(response.data.data);
        setReviewsLoading(false);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviewsError(error);
        setReviewsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { reviewsData, reviewsLoading, reviewsError };
};

export default useReviewsDataFetching;
