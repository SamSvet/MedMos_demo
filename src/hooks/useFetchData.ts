import { useState, useEffect, useRef } from "react";
import { DataItem } from "../api/shared/common/response-data";

type ResponseData<D> = {
  [key: string]: DataItem<D>;
};

const useFetchData = <T>(key: string, fetchFn: () => Promise<DataItem<T>>) => {
  const [data, setData] = useState<DataItem<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const cache = useRef<ResponseData<T>>({});

  useEffect(() => {
    if (cache.current[key]) {
      setData(cache.current![key]);
      setIsLoading(false);
    } else {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetchFn();

          setData(response);
          cache.current[key] = response;
        } catch (error) {
          console.log(error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [fetchFn, key]);
  return [data, isLoading, isError];
};
export default useFetchData;
