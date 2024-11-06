// src/components/Navbar.js
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <h1>Real-Time Employee Analysis</h1>
      <div className="nav-links">
        <Tooltip title="Menu">
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem onClick={handleMenuClose}>Analytics</MenuItem>
          <MenuItem onClick={handleMenuClose}>Reports</MenuItem>
        </Menu>
        <IconButton onClick={toggleSearch}>
          <SearchIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
      {searchOpen && (
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          className="search-bar"
        />
      )}
    </nav>
  );
}

export default Navbar;
