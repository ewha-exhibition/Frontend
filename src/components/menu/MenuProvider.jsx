import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import HamburgerMenu from "./HambugerMenu";

const MenuCtx = createContext(null);

export function MenuProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  const value = useMemo(
    () => ({ open, openMenu, closeMenu, toggleMenu }),
    [open, openMenu, closeMenu, toggleMenu],
  );

  return (
    <MenuCtx.Provider value={value}>
      {children}
      <HamburgerMenu open={open} onClose={closeMenu} />
    </MenuCtx.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuCtx);
  if (!ctx) throw new Error("useMenu must be used within <MenuProvider>");
  return ctx;
}
