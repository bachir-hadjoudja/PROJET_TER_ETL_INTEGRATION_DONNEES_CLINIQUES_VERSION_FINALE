import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import FileUpload from "../components/FileUpload";
import FilesList from "../components/FilesList";
import Hero from "../components/Hero";
import Mapping from "../components/Mapping";

const Home = () => {
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("/api/files", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FILES", payload: json });
      }
    };

    if (user) {
      fetchFiles();
    }
  }, [dispatch, user]);

  return (
    // <div className="home">
    //   <div className="workouts">
    //     {files && files.map((file) => <FilesList key={file._id} file={file} />)}
    //   </div>
    //   <FileUpload />
    // </div>
    <div>
      <Hero />
      <Mapping />
    </div>
  );
};

export default Home;
