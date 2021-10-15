import { createContext } from "react";

type SearchBarContextType = {
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

export const SearchBarContext = createContext<SearchBarContextType>(
  {
    setIsOpenedMail: () => {},
    setOpenedMailID: () => {}
  }
)