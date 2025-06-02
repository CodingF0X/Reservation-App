import { useEffect, useState } from "react";
import Routes from "../components/Routes";

// this hook is to keep track of the path
const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    Routes.subscribe((state) => {
      setPath(state.location.pathname);
    });
  }, []);

  return { path };
};

export default usePath;
