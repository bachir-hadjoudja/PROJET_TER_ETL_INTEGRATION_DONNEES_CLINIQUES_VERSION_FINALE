import { useAuthContext } from "./useAuthContext";
import { useFilesContext } from "./useFilesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchFiles } = useFilesContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchFiles({ type: "SET_FILES", payload: null });
  };

  return { logout };
};
