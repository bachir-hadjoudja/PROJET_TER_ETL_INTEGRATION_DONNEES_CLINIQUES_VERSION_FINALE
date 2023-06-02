import { createContext, useReducer } from "react";

export const FilesContext = createContext();

export const filesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILES":
      return {
        files: action.payload,
      };
    case "CREATE_FILE":
      return {
        files: [action.payload, ...state.files],
      };
    default:
      return state;
  }
};

export const FilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filesReducer, {
    files: null,
  });

  return (
    <FilesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilesContext.Provider>
  );
};
