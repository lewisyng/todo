import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import React from "react";
import "./ListMenu.css";

function ListMenu(props) {
  const { collections } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="listMenu">
      <Button variant="contained" color="primary" onClick={handleMenuOpen}>
        Deine Listen
      </Button>
      <Menu
        className="listMenu__menu"
        elevation={2}
        style={{ width: "200px" }}
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

{
  console.log("colls", collections)
}

        {collections !== undefined && collections.length !== 0 ? (
          collections.map((item) => {
            return (
              <MenuItem
                onClick={() => {
                  handleClose();
                  props.handleSelectedList(item.name);
                }}
              >
                <Typography noWrap>{item.name}</Typography>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem>
            <Typography>Keine Listen</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default ListMenu;
