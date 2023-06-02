import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const FilesList = ({ file }) => {
  return (
    <div>
      <h4>{file.title}</h4>
    </div>
  );
};

export default FilesList;
