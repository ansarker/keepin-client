import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SearchContext } from '../context/SearchProvider';

const useFetch = (dataUrl) => {
  const { value } = useContext(SearchContext);
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, 500)

    return () => {
      clearTimeout(timerId);
    }
  }, [value, data])

  useEffect(() => {
    const fetchApi = async () => {
      let isMounted = true;

      setLoading(true);

      try {
        let { data } = await axios.get(dataUrl, {
          params: {
            q: debouncedValue
          },
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('__id_token__')}`
          }
        })
        setData(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  }, [dataUrl, debouncedValue])

  return {
    loading,
    error,
    data
  }
}
export default useFetch;
