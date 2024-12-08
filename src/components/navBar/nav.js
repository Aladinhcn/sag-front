import { useEffect, useState } from "react";
import {
  AppBar,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "../../context/AppContext";

const Nav = () => {
  const [center, setCenter] = useState(true);
  const [query, setQuery] = useState("");
  const { setIsNavAnimationComplete, fetchData, setDisplayTable } = useAppContext();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      setDisplayTable(false);
      setCenter(false);
      const temp = query;
      fetchData(temp);
    }
  };

  useEffect(() => {
    if (!center) {
      const timer = setTimeout(() => {
        setIsNavAnimationComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [center, setIsNavAnimationComplete]);

  return (
    <AppBar
      style={{ boxShadow: "none", margin: 0 , padding: 0}}
      position="static"
      sx={{
        display: "flex",
        alignItems: center ? "center" : "center",
        flexDirection: center ? "column" : "row",
        justifyContent: center ? "center" : "space-between",
        height: center ? '100vh' : isSmallScreen ? 150 : 100,
        padding: isSmallScreen ? "16px" : "0",
        transition: "all 0.5s ease-in-out",
        overflow: "hidden",
      }}
      color="inherit"
    >
      <Toolbar
        sx={{
          marginBottom: center ? 3 : 0,
          transition: "margin 0.5s ease-in-out",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: center ? (isSmallScreen ? 150 : 240) : 130,
            height: "auto",
            transition: "width 0.5s ease-in-out",
          }}
        />
      </Toolbar>

      <Typography
        sx={{
          marginBottom: isSmallScreen ? 4 : 8,
          display: center ? "block" : "none",
          fontSize: isSmallScreen ? "1.2rem" : "2rem",
        }}
        variant="h4"
      >
        Book Search Assignment
      </Typography>

      <form onSubmit={handleSearch}>
        <FormControl
          sx={{
            m: 1,
            width: center
              ? isSmallScreen
                ? "90%"
                : "70ch"
              : isSmallScreen
              ? "90%"
              : "50ch",
            transition: "width 0.5s ease-in-out",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
      </form>
    </AppBar>
  );
};

export default Nav;
