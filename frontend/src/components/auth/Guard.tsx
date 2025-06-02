import { type JSX, useEffect } from "react";
import usePath from "../../hooks/usePaths";
import { exludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import Routes from "../Routes";
// import { useNavigate } from "react-router-dom";

interface GuardProps {
  children: JSX.Element;
}
const Guard = ({ children }: GuardProps) => {
  const { data: user, loading } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (exludedRoutes.includes(path)) {
      return;
    }


    if (!loading && !user) {
      Routes.navigate("/login");
    }
  }, [path, loading, user]);
 
  
  return <>{exludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
