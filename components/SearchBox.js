"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchText("");
    // Handle search logic here
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full flex-center w-3/5 mt-5"
    >
      <TextField
        id="outlined-basic"
        fullWidth
        type="search"
        color="secondary"
        placeholder="Search for a recipe"
        required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        variant="outlined"
      />
    </form>
  );
}
