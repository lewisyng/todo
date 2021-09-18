import { FunctionComponent, useState } from "react";
import "./ListMenu.sass";
import ListMenuItem from "../ListMenuItem/ListMenuItem";
import { useSelector } from "react-redux";
import Button from "src/components/ui/Button";
import { Modal } from "@material-ui/core";

const ListMenu: FunctionComponent = () => {
  const state = useSelector((state: any) => state);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="listMenu">
      <Button onClick={() => setMenuOpen((prev) => !prev)}>Listen</Button>
      {
        menuOpen && (
          <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
            <ul
              className="listMenu__menu"
              style={{ display: menuOpen ? "block" : "none" }}
            >
              {state.collections ? (
                state.collections.map((item: { name: string }) => {
                  return <ListMenuItem closeWindow={() => setMenuOpen(false)} item={item} />;
                })
              ) : (
                <li className="listMenuItem">
                  <div>Keine Listen</div>
                </li>
              )}
            </ul>
          </Modal>
        )
      }
    </div>
  );
};

export default ListMenu;
