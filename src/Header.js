import { Button, MenuItem, ListItemText, Menu } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { getCollections } from "./localbaseFunctions";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [collections, setCollections] = useState();

  useEffect(() => {
    (async () => {
      setCollections(await getCollections());
    })();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <div className="logo">TODOS</div>
      <Button variant="contained" color="primary" onClick={handleMenuOpen}>
        Lists
      </Button>
      <Menu
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {collections &&
          collections.map((item) => {
            return <MenuItem>{item.name}</MenuItem>;
          })}
      </Menu>
    </header>
  );
}

export default Header;
