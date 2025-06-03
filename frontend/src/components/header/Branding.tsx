import DraftsIcon from "@mui/icons-material/Drafts";
import { Typography } from "@mui/material";
import Routes from "../Routes";
import { useGetMe } from "../../hooks/useGetMe";

const Branding = () => {
  const { data } = useGetMe();

  const handleClick = () => {
    if (data?.status === "alive") {
      Routes.navigate("/");
    } else {
      Routes.navigate("/login");
    }
  };
  return (
    <>
      <DraftsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => handleClick()}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Draftr
      </Typography>
    </>
  );
};

export default Branding;
