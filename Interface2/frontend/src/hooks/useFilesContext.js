import { FilesContext } from "../context/FileContext";
import { useContext } from "react";

export const useFilesContext = () => {
  const context = useContext(FilesContext);

  if (!context) {
    throw Error("useFileContext must be used inside an FileContextProvider");
  }

  return context;
};
