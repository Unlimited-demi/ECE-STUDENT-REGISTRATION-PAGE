import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";

export default function Form1({ submisssion, getData }) {
  const [listOfState, setListOfState] = useState([]);
  const [listOfStateOrigin, setListOfStateOrigin] = useState([]);
  const [listOfLocalGovtOrigin, setListOfLocalGovtOrigin] = useState([]);
  const [listOfLocalGovtResi, setListOfLocalGovtResi] = useState([]);
  const [listOfCountry, setListOfCountry] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonColor, setButtonColor] = useState(false);

  const [formData, setFormData] = useState({
    surname: "",
    firstname: "",
    middlename: "",
    matric_number: "",
    level: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    permanent_address: "",
    nationality: "",
    state_of_origin: "",
    local_government_of_origin: "",
    accommodation: "",
    residential_address: "",
    religion: "",
    state_of_residence: "",
    local_government_of_residence: "",
    guardian_name: "",
    guardian_phone_number: "",
    guardian_email: "",
    suggestion: "",
    file: null,
  });

  const [validation, setValidation] = useState({
    surname: false,
    firstname: false,
    middlename: false,
    matric_number: false,
    level: false,
    dob: false,
    gender: false,
    email: false,
    phone: false,
    permanent_address: false,
    nationality: false,
    state_of_origin: false,
    local_government_of_origin: false,
    accommodation: false,
    residential_address: false,
    religion: false,
    state_of_residence: false,
    local_government_of_residence: false,
    guardian_name: false,
    guardian_phone_number: false,
    guardian_email: false,
    suggestion: false,
    file: false,
  });

  useEffect(() => {
    if (Object.values(validation).every((isValid) => isValid)) {
      setButtonColor(true);
    } else {
      setButtonColor(false);
    }
  }, [validation]);

  function validateImage(file) {
    //Validate if the file is selected
    if (!formData.file) {
      setErrorMessage("Please select an image!");
      return false;
    }
    //Validate File Type (JPG/JPEG)
    const validTypes = ["image/jpeg", "image/jpg"];
    try {
      if (!validTypes.includes(file.type)) {
        setErrorMessage(
          `Only JPG and JPEG images are allowed. '${file.type.replace(
            "image/",
            ""
          )}' isnt allowed`
        );
        return false;
      }

      //Validate File Size (<2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size must be less than 2MB.");
        return false;
      }

      //Validate Image Dimensions (200x200)
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (
          (img.width < 50 && img.width > 1000) ||
          (img.height < 50 && img.height > 1000)
        ) {
          setErrorMessage("Image must be exactly 200x200 pixels.");
          return false;
        }
      };
      //setImageURL(img.src);
      return true;
    } catch (error) {
      console.error("Error validating image:", error);
      setErrorMessage("An error occurred. Please try again.");
      return false;
    }
  }

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: image,
    }));
  };

  // Validation
  useEffect(() => {
    setValidation({
      surname: /^[A-Za-z\s'-]{2,50}$/.test(formData.surname),
      firstname: /^[A-Za-z\s'-]{2,50}$/.test(formData.firstname),
      middlename: /^[A-Za-z\s'-]{2,50}$/.test(formData.middlename),
      matric_number: /^\d{4}\/\d{6}$/.test(formData.matric_number),
      level: /^[0-5]{3}$/.test(formData.level),
      dob: (() => {
        const dobDate = new Date(formData.dob);
        const minDate = new Date("1900-01-01"); // Oldest allowed DOB
        const maxDate = new Date("2010-01-01"); // Today's date (ensuring no future date)
        return dobDate >= minDate && dobDate <= maxDate;
      })(),
      gender: formData.gender === "Male" || formData.gender === "Female",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone:
        /^[0-9]{10,15}$/.test(formData.phone) ||
        /^[+]+[0-9]{10,15}$/.test(formData.phone),
      permanent_address:
        formData.permanent_address.trim().length >= 5 &&
        formData.permanent_address.trim().length <= 100,
      nationality: formData.nationality !== "",
      state_of_origin: formData.state_of_origin !== "",
      local_government_of_origin: formData.local_government_of_origin !== "",
      accommodation:
        formData.accommodation === "Hostel" ||
        formData.accommodation === "Off-Campus",
      residential_address:
        formData.residential_address.trim().length >= 5 &&
        formData.residential_address.trim().length <= 100,
      religion: formData.religion !== "",
      state_of_residence: formData.state_of_residence !== "",
      local_government_of_residence:
        formData.local_government_of_residence !== "",
      guardian_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.guardian_name),
      guardian_phone_number:
        /^[0-9]{10,15}$/.test(formData.guardian_phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.guardian_phone_number),
      guardian_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.guardian_email
      ),
      suggestion:
        formData.suggestion.trim().length >= 3 &&
        formData.suggestion.trim().length <= 300,
      file: validateImage(formData.file),
    });
  }, [formData]);

  // Country of Origin
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await fetch(
          "https://api.first.org/data/v1/countries",
          { signal }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        let data = result.data;
        data = Object.values(data);
        data = data.map((count) => count.country).sort();
        setListOfCountry(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => controller.abort();
  }, []);

  // State of Origin
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        if (formData.nationality === "Nigeria") {
          const response = await fetch(
            "https://nga-states-lga.onrender.com/fetch",
            { signal }
          );
          if (!response.ok) throw new Error("Failed to fetch data");
          const result = await response.json();
          setListOfStateOrigin(result);
        }
        if (formData.nationality !== "Nigeria" && formData.nationality !== "") {
          setListOfStateOrigin(["Foreigner"]);
          return;
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => controller.abort();
  }, [formData.nationality]);

  // State of Residence
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await fetch(
          "https://nga-states-lga.onrender.com/fetch",
          { signal }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setListOfState(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => controller.abort();
  }, []);

  // Local Government of Origin
  useEffect(() => {
    const { state_of_origin, nationality } = formData;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        if (state_of_origin === "Foreigner" || nationality !== "Nigeria") {
          setListOfLocalGovtOrigin(["Foreigner"]);
          return;
        }

        const response = await fetch(
          `https://nga-states-lga.onrender.com/?state=${state_of_origin}`,
          { signal }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setListOfLocalGovtOrigin(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      }
    })();

    return () => controller.abort();
  }, [formData.state_of_origin, formData.nationality]);

  // Local Government of Residence
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await fetch(
          `https://nga-states-lga.onrender.com/?state=${formData.state_of_residence}`,
          { signal }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setListOfLocalGovtResi(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => controller.abort();
  }, [formData.state_of_residence]);

  // Handle Submission Logic

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the brouser from clearing the fields after submission

    // Validation Logic
    const newValidation = {
      surname: /^[A-Za-z\s'-]{2,50}$/.test(formData.surname),
      firstname: /^[A-Za-z\s'-]{2,50}$/.test(formData.firstname),
      middlename: /^[A-Za-z\s'-]{2,50}$/.test(formData.middlename),
      matric_number: /^\d{4}\/\d{6}$/.test(formData.matric_number),
      level: /^[0-5]{3}$/.test(formData.level),
      dob: (() => {
        const dobDate = new Date(formData.dob);
        const minDate = new Date("1900-01-01");
        const maxDate = new Date("2010-01-01");
        return dobDate >= minDate && dobDate <= maxDate;
      })(),
      gender: formData.gender === "Male" || formData.gender === "Female",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone:
        /^[0-9]{10,15}$/.test(formData.phone) ||
        /^[+]+[0-9]{10,15}$/.test(formData.phone),
      permanent_address:
        formData.permanent_address.trim().length >= 5 &&
        formData.permanent_address.trim().length <= 100,
      nationality: formData.nationality !== "",
      state_of_origin: formData.state_of_origin !== "",
      local_government_of_origin: formData.local_government_of_origin !== "",
      accommodation:
        formData.accommodation === "Hostel" ||
        formData.accommodation === "Off-Campus",
      residential_address:
        formData.residential_address.trim().length >= 5 &&
        formData.residential_address.trim().length <= 100,
      religion: formData.religion !== "",
      state_of_residence: formData.state_of_residence !== "",
      local_government_of_residence:
        formData.local_government_of_residence !== "",
      guardian_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.guardian_name),
      guardian_phone_number:
        /^[0-9]{10,15}$/.test(formData.guardian_phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.guardian_phone_number),
      guardian_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.guardian_email
      ),
      suggestion:
        formData.suggestion.trim().length >= 3 &&
        formData.suggestion.trim().length <= 300,
      file: validateImage(formData.file),
    };

    setValidation(newValidation);

    const form = new FormData();

    for (let key in formData) {
      form.append(key, formData[key]);
    }
    // Check if form is valid
    try {
      if (Object.values(newValidation).every((isValid) => isValid)) {
        // API endpoint for the form.
        // Do not use '/registration' as your end point [If you must go to vite.config.js file and comment out the server field before building]
        const response = await fetch("/registration", {
          method: "POST",
          body: form,
        });
        // Response data must have identical fields to that of the request and must all be strings.
        // The file URL location of the file(image) in the CDN must be returned
        if (!response) {
          throw new Error("Error submitting data");
        }
        const data = await response.json();
        //alert("Form submitted successfully!");
        //console.log(data);
        getData(data);
        submisssion(true);
      } else {
        alert("Please fill out all required fields.");
      }
    } catch (error) {
      console.error("Error submittiong data:", error);
      alert("Oops! Error submittiong data");
    }
  };

  // Components
  return (
    <>
      <div className="fs-5 mt-2 mb-4">Personal Information</div>
      {/* FORM FIELDS */}
      <form className={`row g-3 mb-5`} onSubmit={handleSubmit}>
        {/* Surname */}
        <div className="col-md-4">
          <label htmlFor="validationSurname" className="form-label">
            Surname
          </label>
          <input
            name="surname"
            type="text"
            className={`form-control ${
              validation.surname ? "is-valid" : "is-invalid"
            }`}
            id="validationSurname"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid surname!</div>
        </div>

        {/* Firstname */}
        <div className="col-md-4">
          <label htmlFor="validationFirstname" className="form-label">
            First Name
          </label>
          <input
            name="firstname"
            type="text"
            className={`form-control ${
              validation.firstname ? "is-valid" : "is-invalid"
            }`}
            id="validationFirstname"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid first name!</div>
        </div>

        {/* Middlename */}
        <div className="col-md-4">
          <label htmlFor="validationMiddlename" className="form-label">
            Middle Name
          </label>
          <input
            name="middlename"
            type="text"
            className={`form-control ${
              validation.middlename ? "is-valid" : "is-invalid"
            }`}
            id="validationMiddlename"
            onChange={handleChange}
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid middle name!</div>
        </div>

        {/* Matric Number */}
        <div className="col-md-4">
          <label htmlFor="validationRegNumber" className="form-label">
            Matric Number
          </label>
          <input
            name="matric_number"
            type="text"
            className={`form-control ${
              validation.matric_number ? "is-valid" : "is-invalid"
            }`}
            id="validationRegNumber"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid matric number!</div>
        </div>

        {/* Level */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Level
          </label>
          <select
            name="level"
            className={`form-select ${
              validation.level ? "is-valid" : "is-invalid"
            }`}
            id="validationCountry"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {[100, 200, 300, 400, 500].map((level) => {
              return <option>{level}</option>;
            })}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a level.</div>
        </div>

        {/* Date of Birth */}
        <div className="col-md-4">
          <label htmlFor="validationDob" className="form-label">
            Date of Birth
          </label>
          <input
            name="dob"
            type="date"
            className={`form-control ${
              validation.dob ? "is-valid" : "is-invalid"
            }`}
            id="validationDob"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a valid date.</div>
        </div>

        {/* Gender Selection */}
        <div className="col-md-12">
          <label className="form-label d-block">Sex</label>

          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.gender ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="gender"
                id="genderMale"
                value="Male"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderMale">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.gender ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="gender"
                id="genderFemale"
                value="Female"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderFemale">
                Female
              </label>
            </div>
          </div>

          {!validation.gender && (
            <div className="invalid-feedback d-block">
              Please select a gender.
            </div>
          )}
          {validation.gender && (
            <div className="valid-feedback d-block">Good!</div>
          )}
        </div>

        {/* Email */}
        <div className="col-md-8">
          <label htmlFor="validationEmail" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className={`form-control ${
              validation.email ? "is-valid" : "is-invalid"
            }`}
            id="validationEmail"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid email!</div>
        </div>

        {/* Phone Number */}
        <div className="col-md-4">
          <label htmlFor="validationPhone" className="form-label">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            className={`form-control ${
              validation.phone ? "is-valid" : "is-invalid"
            }`}
            id="validationPhone"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid Phone Number!</div>
        </div>

        {/* Permanent Address */}
        <div className="col-md-12 ">
          <label htmlFor="validationAddress" className="form-label">
            Permanent Address
          </label>
          <input
            name="permanent_address"
            type="text"
            className={`form-control ${
              validation.permanent_address ? "is-valid" : "is-invalid"
            }`}
            id="validationAddress"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid Address!</div>
        </div>

        {/* Nationality */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Nationality
          </label>
          <select
            name="nationality"
            className={`form-select ${
              validation.nationality ? "is-valid" : "is-invalid"
            }`}
            id="validationCountry"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {listOfCountry.map((country) => (
              <option>{country}</option>
            ))}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a country!</div>
        </div>

        {/* State of Origin */}
        <div className="col-md-4">
          <label htmlFor="validationState" className="form-label">
            State of Origin
          </label>
          <select
            name="state_of_origin"
            className={`form-select ${
              validation.state_of_origin ? "is-valid" : "is-invalid"
            }`}
            id="validationState"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {listOfStateOrigin.map((state) => (
              <option>{state}</option>
            ))}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a state!</div>
        </div>

        {/* Local Government of Origin */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Local Government of Origin
          </label>
          <select
            name="local_government_of_origin"
            className={`form-select ${
              validation.local_government_of_origin ? "is-valid" : "is-invalid"
            }`}
            id="validationCountry"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {listOfLocalGovtOrigin.map((local) => (
              <option>{local}</option>
            ))}
          </select>
          <div className="invalid-feedback">
            Please select a local government!
          </div>
        </div>

        {/* Accommodation */}
        <div className="col-md-12">
          <label className="form-label d-block">Accommodation</label>

          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.accommodation ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="accommodation"
                id="hostel"
                value="Hostel"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderMale">
                Hostel
              </label>
            </div>
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.accommodation ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="accommodation"
                id="off-Campus"
                value="Off-Campus"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderFemale">
                Off-Campus
              </label>
            </div>
          </div>
          {!validation.accommodation && (
            <div className="invalid-feedback d-block">
              Please select an accommodation.
            </div>
          )}
          {validation.accommodation && (
            <div className="valid-feedback d-block">Good!</div>
          )}
        </div>

        {/*Residential Address */}
        <div className="col-md-12">
          <label htmlFor="validationAddress" className="form-label">
            Residential Address
          </label>
          <input
            name="residential_address"
            type="text"
            className={`form-control ${
              validation.residential_address ? "is-valid" : "is-invalid"
            }`}
            id="validationAddress"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid Address!</div>
        </div>

        {/* Religion */}
        <div className="col-md-4">
          <label htmlFor="validationReligion" className="form-label">
            Religion
          </label>
          <select
            name="religion"
            className={`form-select ${
              validation.religion ? "is-valid" : "is-invalid"
            }`}
            id="validationReligion"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            <option>Christianity</option>
            <option>Islam</option>
            <option>Traditional Religion</option>
            <option>Other</option>
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a religion!</div>
        </div>

        {/* State of Residence */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            State of Residence
          </label>
          <select
            name="state_of_residence"
            className={`form-select ${
              validation.state_of_residence ? "is-valid" : "is-invalid"
            }`}
            id="validationCountry"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {listOfState.map((state) => (
              <option>{state}</option>
            ))}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a state!</div>
        </div>

        {/* Local Government of Residence */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Local Government of Residence
          </label>
          <select
            name="local_government_of_residence"
            className={`form-select ${
              validation.local_government_of_residence
                ? "is-valid"
                : "is-invalid"
            }`}
            id="validationCountry"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {listOfLocalGovtResi.map((state) => (
              <option>{state}</option>
            ))}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">
            Please select a local government!
          </div>
        </div>

        {/* Guardian Name */}
        <div className="col-md-4">
          <label htmlFor="validationGuardianname" className="form-label">
            Guardian Name
          </label>
          <input
            name="guardian_name"
            type="text"
            className={`form-control ${
              validation.guardian_name ? "is-valid" : "is-invalid"
            }`}
            id="validationGuardianname"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid guardian name!</div>
        </div>

        {/* Guardian Phone Number */}
        <div className="col-md-4">
          <label htmlFor="validationGuardianPhone" className="form-label">
            Guardian Phone Number
          </label>
          <input
            name="guardian_phone_number"
            type="tel"
            className={`form-control ${
              validation.guardian_phone_number ? "is-valid" : "is-invalid"
            }`}
            id="validationGuardianPhone"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid guardian phone Number!</div>
        </div>

        {/* Guardian Email */}
        <div className="col-md-4">
          <label htmlFor="validationGuardianEmail" className="form-label">
            Guardian Email
          </label>
          <input
            name="guardian_email"
            type="email"
            className={`form-control ${
              validation.guardian_email ? "is-valid" : "is-invalid"
            }`}
            id="validationGuardianEmail"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid guardian email!</div>
        </div>

        {/* Image Upload */}

        <div className="col-md-12">
          <label htmlFor="imageUpload" className="form-label">
            Upload Passport Image (Max 2MB)
          </label>
          <input
            name="file"
            type="file"
            className={`form-control ${
              validation.file ? "is-valid" : "is-invalid"
            }`}
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
          />
          {!validation.file && (
            <div className="invalid-feedback">{errorMessage}</div>
          )}

          {validation.file && <div className="valid-feedback">Good!</div>}
        </div>

        {/* Suggestions */}
        <div className={`col-md-12`}>
          <label htmlFor="validationSuggestion" className="form-label">
            Suggestions for the Department
          </label>
          <textarea
            rows={6}
            name="suggestion"
            type="text"
            className={`form-control ${classes.height} ${
              validation.suggestion ? "is-valid" : "is-invalid"
            }`}
            id="validationSuggestion"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">
            Write a suggestion for the Department!
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-12 col-md-4 mt-4 mb-0 text-center">
          <button
            className={`btn ${
              buttonColor ? classes.greenButton : classes.greyButton
            }  w-100`}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

/*
LIST OF FIELDS
surname (String)
firstname (String)
middlename (String)
matric_number (String)
level (String)
dob (String)
gender (String)
email (String)
phone (String)
permanent_address (String)
nationality (String)
state_of_origin (String)
local_government_of_origin (String)
accommodation (String)
residential_address (String)
religion (String)
state_of_residence (String)
local_government_of_residence (String)
suggestion (String)
file (Image)
*/
