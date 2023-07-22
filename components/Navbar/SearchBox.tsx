import { useSearchRecipesStore } from "@/store/recipe";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, alpha, createTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { ChangeEvent } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    // border: "1px solid",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const theme = createTheme();

const SearchBox = () => {
  const query = useSearchRecipesStore((state) => state.query);
  const setQuery = useSearchRecipesStore((state) => state.setQuery);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleInputChange}
          type="search"
          value={query}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </ThemeProvider>
  );
};

export default SearchBox;
