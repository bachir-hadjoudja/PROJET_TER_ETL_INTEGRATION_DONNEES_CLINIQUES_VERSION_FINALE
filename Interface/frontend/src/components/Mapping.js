import React, { useState, useEffect } from "react";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';

const dictionnaires = [
  { name: "Patient" },
  { name: "Encounter" },
  { name: "Transfer" },
  { name: "Diagnosis" },
  { name: "Procedure" },
  { name: "Service " },
];

const Patient = [
  "PatientNumber",
  "DateOfBirth",
  "Gender",
  "PatientDeceased",
  "Extra:DateofDeath",
  "Extra:PlaceOfBirth",
  "EthnicOrigin",
  "Nationality",
  "LastName",
  "FirstName",
  "Title",
  "TitleExtra:MothersLastName",
  "Extra:MothersFirstName",
  "Extra:FathersLastName",
  "Extra:FathersFirstName",
  "Extra:FamilyDoctor",
  "Extra:BloodRefusal",
  "Extra:OrganDonor",
  "Extra:PrefLanguage",
  "Extra:LastUpdateDateTime",
  "NationalIdentifier",
];
const Service = [
  "PatientNumber",
  "Hospital",
  "StartDateTime",
  "Quantity",
  "ServiceCode",
  "Extra:PrimaryProcedure",
  "EncounterNumber",
  "ServicingDepartment",
  "Duration",
  "ActualCharge",
  "EndDateTime",
  "PointOfService1",
  "Extra:ServiceDescription",
  "Extra:ServiceGroup",
  "Extra:LastUpdateDateTime",
  "Consultant",
  "Extra:ConsultantName",
  "ConsultantSpecialty",
  "Clinic",
  "OrderDateTime",
  "Extra:PriorityCode",
  "Extra:Priority",
  "Extra:StatusCode",
  "Extra:StartDateTreatmentPlan",
  "Extra:EndDateTreatmentPlan",
  "Extra:RequestNo",
  "Extra:OrderingDepartment",
  "Extra:PrivateInsurance",
  "Extra:OriginalServiceCode",
  "Extra:OriginalServiceDesc",
  "Extra:OriginalServiceGroup",
  "Extra:RadiographerExamDuration",
  "Extra:RadiologistLicence",
  "Extra:RadiologistName",
  "Extra:RadiologistSpecialty",
  "Extra:RadiologistReportDateTime",
  "Extra:RadiologistFinalisationDate",
  "Extra:RadiologistReportDuration",
  "Extra:StaffSignoff",
  "Extra:CollectionTime",
  "Extra:SampleReceivedTime",
  "TestResult",
  "Extra:SignatureDateTime",
  "Extra:PathologistName",
  "Extra:PathologistLicence",
  "Extra:ServiceGroupDesc",
  "Extra:DIN",
  "Extra:StartDispenseTime",
  "Extra:PrescriptionValidationTime",
  "Extra:QuantityAdministered",
  "Extra:QuantityPrescribed",
  "Extra:ProcedureSpecialty",
  "Extra:ElectiveOrEmergency",
  "Extra:PreOpStart",
  "Extra:PreOpEnd",
  "Extra:AnaethesiaStart",
  "Extra:AnaethesiaEnd",
  "Extra:RecoveryStart",
  "Extra:RecoveryEnd",
  "Extra:NumberXtraMedicalStaff",
  "Extra:NumberExtraPersons",
  "Extra:NumberTheatreNurses",
  "Extra:NumberTheatreNursesAux",
  "Extra:OncologyFlag",
  "Extra:PatientType",
  "Extra:CancellationDate",
  "Extra:CancellationReasonCode",
  "Extra:CancellationReasonDesc",
  "Extra:AnaesthetistCode",
  "Extra:AnaesthetistName",
  "Extra:AnaestheticTechnique",
  "Extra:RequestStatus",
  "Extra:PlannedSurgeryDate",
  "Extra:OperationID",
  "Extra:OperationStatus",
  "EncounterType",
  "Extra:PACUDuration",
  "Extra:Implants",
  "Extra:Site",
  "Extra:TestName",
  "Extra:OrderingConsultant",
  "Extra:OrderingConsultantSpecialty"
];

const Encounter = [
  "PatientNumber",
  "Hospital",
  "StartDateTime",
  "EndDateTime",
  "EncounterNumber",
  "Age",
  "EncounterType",
  "EncounterCategory",
  "LengthOfStay",
  "AdmitWard",
  "DischargeWard",
  "ReferringConsultant",
  "Extra:ReferringConsultantName",
  "ReferringConsultantSpecialty",
  "AdmittingConsultant",
  "Extra:AdmittingConsultantName",
  "AdmittingConsultantSpecialty",
  "AttendingConsultant",
  "Extra:AttendingConsultantName",
  "AttendingConsultantSpecialty",
  "DischargeConsultant",
  "Extra:DischargeConsultantName",
  "DischargeConsultantSpecialty",
  "Extra:TransferToHospital",
  "Extra:CauseOfDeath",
  "Extra:TypeOfDeath",
  "Extra:DateofDeath",
  "Extra:Autopsy",
  "DRG1",
  "DRG1Version",
  "Extra:DRGGravity",
  "Extra:MDC",
  "Extra:LastUpdateDateTime",
  "DischargeDestination",
  "Address",
  "PostCode",
  "Extra:Municipality",
  "Suburb",
  "Extra:Region",
  "Extra:Country",
  "Extra:LivingArrangements",
  "MaritalStatus",
  "AdmissionCategory",
  "AdmissionSource",
  "AdmissionElection",
  "HealthFund",
  "FinancialClass",
  "Extra:TransferFromHospital",
  "EXTRA:ClinicName",
  "EXTRA:ClinicSpecialtyCode",
  "EXTRA:ClinicSpecialty",
  "EXTRA:ModeOfArrival",
  "EXTRA:PreTriageTime",
  "EXTRA:TriageStartTime",
  "EXTRA:TriageEndTime",
  "EXTRA:DiagnosisOnDischarge",
  "EXTRA:PhysicianSpecialityKey",
  "EXTRA:CancellationDate",
  "EXTRA:CancellationFlag",
  "Extra:VisitType",
  "Extra:Site",
  "Extra:DischargeStatus",
  "Extra:ComplaintDesc",
  "Extra:TriageCode",
  "Extra:TriageDesc",
];

const Transfer = [
  "PatientNumber",
  "Extra:Hospital",
  "BedNumber",
  "EncounterNumber",
  "Ward",
  "StartDateTime",
  "Extra:RoomNumber",
  "Extra:WardType",
  "Leave",
  "Extra:LeaveType",
  "AttendingConsultant_Code",
  "Extra:AttendingConsultantName",
  "AttendingConsultant_SpecialtyCode",
  "Extra:LastUpdateDateTime",
  "Extra:Site",
];

const Diagnosis = [
  "Extra:SourcePatientNumber",
  "Extra:Hospital",
  "EncounterNumber",
  "DiagnosisCode",
  "DiagnosisVersion",
  "Sequence",
  "Extra:DiagnosisType",
  "ConditionOnset",
  "Extra:SequenceService",
  "Extra:PrimaryTumour",
  "Extra:TumourCode",
  "Extra:Metastase",
  "Extra:Ganglion",
  "Extra:StageEvolution",
  "Extra:Morphology",
  "Extra:Screening",
  "Extra:DiagnosisDateTime",
  "Extra:CodeCharacteristic",
  "Extra:CodeCharacteristicDesc",
  "Extra:LocalDiagCode",
  "DiagnosisDescription",
  "Extra:LastUpdateDateTime",
];
const Procedure = [
  "Last Name",
  "First Name",
  "Extra:SourcePatientNumber",
  "Extra:Hospital",
  "EncounterNumber",
  "ProcedureDateTime",
  "ProcedureCode",
  "ProcedureVersion",
  "Sequence",
  "Extra:InterventionType",
  "Consultant",
  "Extra:ConsultantName",
  "ConsultantSpecialty",
  "ProcedureTheatre",
  "Extra:LocalProcTheatre",
  "Extra:LocalProcTheatreDesc",
  "Extra:NbrProcedures",
  "Extra:LastUpdateDateTime",
];

const Mapping = () => {
  const [selectedList, setSelectedList] = useState("");
  const [selectededData, setSelectededData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedArray, setSelectedArray] = useState("");
  const [fileData, setFileData] = useState(null);
  const [columnNames, setColumnNames] = useState([]);
  const [modifiedColumnNames, setModifiedColumnNames] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setFileType(file.type);
    setTitle(file.name);
    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setFileData(jsonData);
      setColumnNames(jsonData[0]);
      setModifiedColumnNames([]);
    };

    reader.readAsArrayBuffer(file);
  };
  //console.log("le fichier", file)
  // hundle upload files
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

  // Handle list selection
  const handleListSelection = (e) => {
    const selectedArrayName = e.target.value;
    // Reset SelectededData if no array is selected
    if (selectedArrayName === "None") {
      setSelectededData([]);
      setFilteredData([]);
    } else {
      let selectedArrayData;
      switch (selectedArrayName) {
        case "Patient":
          selectedArrayData = Patient;
          break;
        case "Encounter":
          selectedArrayData = Encounter;
          break;
        case "Transfer":
          selectedArrayData = Transfer;
          break;
        case "Diagnosis":
          selectedArrayData = Diagnosis;
          break;
        case "Procedure":
          selectedArrayData = Procedure;
          break;
        case "Service":
          selectedArrayData = Service;
          break;
        default:
          selectedArrayData = [];
          break;
      }

      setSelectededData(selectedArrayData);
    }
    setSelectedList(selectedArrayName);
  };
  useEffect(() => {
    if (selectededData.length > 0) {
      const filtered = columnNames.filter(
        (column) => !selectededData.includes(column)
      );
      setFilteredData(filtered);
    }
  }, [selectededData]);

  // Handle column name change
  const handleColumnNameChange = (index, value) => {
    const updatedColumnNames = [...modifiedColumnNames];
    updatedColumnNames[index] = value;
    setModifiedColumnNames(updatedColumnNames);
  };
  const validateInputs = () => {
    const mandatoryFields = {
      Patient: ["PatientNumber"],
      Encounter: [
        "PatientNumber",
        //"Hospital",
        "StartDateTime",
        "EndDateTime",
        "EncounterNumber",
      ],
      Diagnosis: [
        "EncounterNumber",
        "DiagnosisCode",
        "DiagnosisVersion",
        "Sequence",
      ],
      Procedure: ["EncounterNumber", "ProcedureVersion", "ProcedureCode"],
      Transfer: ["PatientNumber", "EncounterNumber", "Ward", "StartDateTime"],
      Service: ["PatientNumber", "StartDateTime", "Quantity", "ServiceCode"],
    };

    const missingFields = [];

    // Check if the selectedList is in the mandatoryFields object
    if (selectedList && mandatoryFields[selectedList]) {
      const requiredFields = mandatoryFields[selectedList];

      // Check if any of the required fields are missing
      requiredFields.forEach((field) => {
        if (!modifiedColumnNames.includes(field)) {
          missingFields.push(field);
        }
      });
    }

    // Return true if all required fields are filled in, otherwise return false
    return missingFields.length === 0;
  };

  const resetState = () => {
    setFileData(null);
    setColumnNames([]);
    setModifiedColumnNames([]);
    setIsSaving(false);
    setColumnNames([]);
    setSelectededData([]);
    setFilteredData([]);
    setSelectedList([]);
  };

  // };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const isInputsValid = validateInputs();

    if (!isInputsValid) {
      // Required fields are not filled in, handle accordingly
      console.log("Required fields are not filled in.");
      // You can show an error message to the user or handle the scenario as per your requirement.
      return;
    }
    const updatedFileData = [...fileData];
    const modifiedColumnIndexes = {};

    modifiedColumnNames.forEach((name, index) => {
      if (name !== "") {
        modifiedColumnIndexes[index] = true;
        updatedFileData[0][index] = name;
      }
    });

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

    // Create an object to store the column changes
    const columnChanges = {};

    filteredData.forEach((name, index) => {
      columnChanges[name] = modifiedColumnNames[index] || ""; // Use empty string if no modification is made
    });

    const formData = new FormData();
    console.log("formData before:", file);
    formData.append("file", file);

    console.log("formData after:", formData);
    // Create the data object to send to the backend
    const dataToSend = {
      columnChange: filteredData.reduce((result, name, index) => {
        result[name] = modifiedColumnNames[index];
        return result;
      }, {}),
      fileName: fileName, // Replace with the actual file name
      fileType: selectedList,
    };

    console.log("Data to send to backend:", dataToSend);

    //console.log(formData);
    // send excel file   //add python api file
    fetch("http://localhost:4000/", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log("Response from file upload:", data);
        // ...
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        // ...
      });

    // Send the POST request to the backend // add python api information
    fetch("http://localhost:5010", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "access-control-allow-origin": "*",
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log("Response from backend:", data);
        // ...
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        // ...
      });
    // const fileInput = document.getElementById("fileInput");
    // fileInput.value = null;
    //const fileInput = document.getElementById("fileInput");
    //fileInput.value = null;
    setColumnNames([]);
    setModifiedColumnNames([]);
    setFileData([]);
    setIsSaving(false);
    resetState();
    navigate("/save");
  };

  // Enable save button when there are modifications
  useEffect(() => {
    setIsSaving(modifiedColumnNames.length > 0);
  }, [modifiedColumnNames]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel File Uploader</h1>
      <div className="mb-4 flex justify-evenly items-center sm:flex-col		">
        <div
          className="border-solid border-2 border-slate-200 py-1 w-1/4 rounded-lg sm:w-full	"
          style={{ background: "#36B697" }}
        >
          <h2 className="text-white font-bold px-4 py-2">
            Latest uploaded Files
          </h2>
          <ul>
            {files &&
              files.map((file) => (
                <li
                  className="text-white py-1 px-2 mb-1 border-solid border-t-2 border-slate-200"
                  key={file._id}
                >
                  {file.title}
                </li>
              ))}
          </ul>
        </div>
        <label className="block sm:w-full">
          <input
            type="file"
            //accept=".xlsx, .xls"
            className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-emerald-50 file:text-emerald-700
        hover:file:bg-emerald-100
      "
            onChange={handleFileUpload}
          />
        </label>

        <div className="flex items-center sm:w-full">
          <h4 className="mr-3">Selected List: {selectedList}</h4>
          <select
            value={selectedList}
            onChange={handleListSelection}
            className=" border w-auto border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-600 block  p-2.5 dark:bg-emerald-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
            style={{ backgorund: "#36B697" }}
          >
            <option value="">Select a List</option>
            <option value="Patient">Patient</option>
            <option value="Encounter">Encounter</option>
            <option value="Transfer">Transfer</option>
            <option value="Diagnosis">Diagnosis</option>
            <option value="Procedure">Procedure</option>
            <option value="Service">Service</option>
          </select>
        </div>
      </div>
      {fileData && (
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300">Original Name</th>
                <th className="border-b-2 border-gray-300">Modified Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((name, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 py-2 text-center">
                    {name}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center">
                    <select
                      value={modifiedColumnNames[index] || ""}
                      onChange={(e) =>
                        handleColumnNameChange(index, e.target.value)
                      }
                      disabled={selectedList === ""}
                      className="bg-gray-50 border m-auto border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-600 block  p-2.5 dark:bg-emerald-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-emerald-500"
                    >
                      <option value="">Unchanged</option>
                      {selectededData.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSaveChanges}
            // disabled={!isSaving}
            className="mt-4 bg-emerald-500 block ml-auto hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Mapping;
