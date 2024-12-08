import { Typography, useMediaQuery } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "@mui/material/styles";

const Error = () => {
  const { error, displayTable, isNavAnimationComplete } = useAppContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (error && !displayTable && !isNavAnimationComplete) {
    return (
      <>
        <Typography variant="h5" sx={{
          fontSize: isSmallScreen ? "1.2rem" : "1.8rem",
          color: 'gray'
        }}>
          No books found!
          <br />
          Pleast try again
        </Typography>
      </>
    );
  }
};

export default Error;
