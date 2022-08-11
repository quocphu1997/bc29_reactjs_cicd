import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../contexts/loading.context";



export const useAsync = ({ dependancies = [], service }) => {
  const [_, setLoadingState] = useContext(LoadingContext);
  const [state, setState] = useState([])

  useEffect(() => {
    fetchData();
  }, dependancies);
  const fetchData = async () => {
    setLoadingState({isLoading: true});
    // call api
    const results = await service()
    console.log(results);
    // end call api
    setLoadingState({isLoading: false});

    setState(results.data.content)
  };
  return {
    state
  }
};
