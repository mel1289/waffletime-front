import React, { useState } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { isBusinessOpen } from "../hours";

const Header = () => {
  const [open, setOpen] = useState(isBusinessOpen());

  return (
    <div>
      {open === false && (
        <div class="__alert">
            Les commandes sont fermés. Rendez-vous à 18H pour commander.
        </div>
      )}
      <HeaderNavbar />
    </div>
  );
};

export default Header;
