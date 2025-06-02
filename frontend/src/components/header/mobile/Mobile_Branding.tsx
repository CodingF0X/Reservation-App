import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";

const Mobile_Branding = () => {
  return (
    <>
      <DraftsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Foxie
      </Typography>
    </>
  );
};

export default Mobile_Branding;
