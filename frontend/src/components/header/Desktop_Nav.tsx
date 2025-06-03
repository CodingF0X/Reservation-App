import { Box, Button } from "@mui/material";
import Routes from "../Routes";

interface DesktopNavProps {
  pages: string[];
}

const handleClick = async (page: string) => {
  if (page === "Properties") {
    Routes.navigate("/property");
  }
};
const Desktop_Nav = ({ pages }: DesktopNavProps) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            onClick={() => handleClick(page)}
            key={page}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Desktop_Nav;
