import { useState } from "react";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const FileUpload = () => {
  const { dispatch } = useFilesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    setTitle(fileName);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!user) {
  //     setError("You must be logged in");
  //     return;
  //   }

  //   const file = { title };

  //   const response = await fetch("/api/files", {
  //     method: "POST",
  //     body: file,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = response.json();

  //   if (!response.ok) {
  //     setError(json.error);
  //   }
  //   if (response.ok) {
  //     setTitle("");
  //     setError(null);
  //     dispatch({ type: "CREATE_FILE", payload: json });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!title) {
      setError("Please provide a file title");
      return;
    }

    const filet = { title };

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: JSON.stringify(filet),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        setTitle("");
        setError(null);
        dispatch({ type: "CREATE_FILE", payload: data });
      }
    } catch (error) {
      setError("An error occurred while uploading the file.");
      console.error(error);
    }
  };

  console.log(title);
  return (
    <div>
      {/* <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        for="file_input"
      >
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        onChange={handleChange}
      /> */}
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          onchange="loadFile(event)"
          className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
          onChange={handleChange}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default FileUpload;
