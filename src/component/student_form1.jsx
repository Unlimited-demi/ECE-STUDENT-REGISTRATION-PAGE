import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";

export default function Form1({
  submisssion,
  getData,
  getErrorMes,
  getError,
  isOnline,
}) {
  const [listOfState, setListOfState] = useState([]);
  const [listOfStateOrigin, setListOfStateOrigin] = useState([]);
  const [listOfLocalGovtOrigin, setListOfLocalGovtOrigin] = useState([]);
  const [listOfLocalGovtResi, setListOfLocalGovtResi] = useState([]);
  const [listOfCountry, setListOfCountry] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonColor, setButtonColor] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMes, setSubmitErrorMes] = useState([]);
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
    reg_number: "",
    level: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: "",
    permanent_address: "",
    nationality: "",
    state_of_origin: "",
    lga_of_origin: "",
    accommodation: "",
    residential_address: "",
    religion: "",
    state_of_residence: "",
    lga_of_residence: "",
    guardian_name: "",
    guardian_phone_number: "",
    guardian_email: "",
    feedback: "",
    passport_image: null,
  });

  const [validation, setValidation] = useState({
    last_name: false,
    first_name: false,
    middle_name: false,
    reg_number: false,
    level: false,
    date_of_birth: false,
    gender: false,
    email: false,
    phone_number: false,
    permanent_address: false,
    nationality: false,
    state_of_origin: false,
    lga_of_origin: false,
    accommodation: false,
    residential_address: false,
    religion: false,
    state_of_residence: false,
    lga_of_residence: false,
    guardian_name: false,
    guardian_phone_number: false,
    guardian_email: false,
    feedback: false,
    passport_image: false,
  });

  useEffect(() => {
    if (Object.values(validation).every((isValid) => isValid)) {
      if (!submitted) {
        setButtonColor(true);
      }
    } else {
      setButtonColor(false);
    }
  }, [validation]);

  function validateImage(file) {
    //Validate if the file is selected
    if (!formData.passport_image) {
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
          (img.width < 100 && img.width > 1000) ||
          (img.height < 100 && img.height > 1000)
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
      passport_image: image,
    }));
  };

  // Validation
  useEffect(() => {
    setValidation({
      last_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.last_name),
      first_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.first_name),
      middle_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.middle_name),
      reg_number: /^\d{4}\/\d{6}$/.test(formData.reg_number),
      level: /^[0-5]{3}$/.test(formData.level),
      date_of_birth: (() => {
        const dobDate = new Date(formData.date_of_birth);
        const minDate = new Date("1900-01-01"); // Oldest allowed DOB
        const maxDate = new Date("2010-01-01"); // Today's date (ensuring no future date)
        return dobDate >= minDate && dobDate <= maxDate;
      })(),
      gender: formData.gender === "Male" || formData.gender === "Female",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone_number:
        /^[0-9]{11,15}$/.test(formData.phone_number) ||
        /^[+]+[0-9]{11,15}$/.test(formData.phone_number),
      permanent_address:
        formData.permanent_address.trim().length >= 5 &&
        formData.permanent_address.trim().length <= 100,
      nationality: formData.nationality !== "",
      state_of_origin: formData.state_of_origin !== "",
      lga_of_origin: formData.lga_of_origin !== "",
      accommodation:
        formData.accommodation === "Hostel" ||
        formData.accommodation === "Off-Campus",
      residential_address:
        formData.residential_address.trim().length >= 5 &&
        formData.residential_address.trim().length <= 100,
      religion: formData.religion !== "",
      state_of_residence: formData.state_of_residence !== "",
      lga_of_residence: formData.lga_of_residence !== "",
      guardian_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.guardian_name),
      guardian_phone_number:
        /^[0-9]{10,15}$/.test(formData.guardian_phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.guardian_phone_number),
      guardian_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.guardian_email
      ),
      feedback:
        formData.feedback.trim().length >= 5 &&
        formData.feedback.trim().length <= 1000,
      passport_image: validateImage(formData.passport_image),
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
  }, [isOnline]);

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
  }, [formData.nationality, isOnline]);

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
  }, [isOnline]);

  // Local Government of Origin
  useEffect(() => {
    const { state_of_origin, nationality } = formData;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        if (!state_of_origin) {
          return;
        }
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
  }, [formData.state_of_origin, formData.nationality, isOnline]);

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
  }, [formData.state_of_residence, isOnline]);

  // Handle Error Message
  useEffect(() => {
    getErrorMes(submitErrorMes);
    getError(submitError);
  }, [submitErrorMes, submitError]);

  // Handle Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from clearing the fields after submission
    setButtonColor(false);
    setSubmitted(true);
    setSubmitError(false);
    setSubmitErrorMes([]);

    // Validation Logic
    const newValidation = {
      last_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.last_name),
      first_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.first_name),
      middle_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.middle_name),
      reg_number: /^\d{4}\/\d{6}$/.test(formData.reg_number),
      level: /^[0-5]{3}$/.test(formData.level),
      date_of_birth: (() => {
        const dobDate = new Date(formData.date_of_birth);
        const minDate = new Date("1900-01-01");
        const maxDate = new Date("2010-01-01");
        return dobDate >= minDate && dobDate <= maxDate;
      })(),
      gender: formData.gender === "Male" || formData.gender === "Female",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone_number:
        /^[0-9]{10,15}$/.test(formData.phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.phone_number),
      permanent_address:
        formData.permanent_address.trim().length >= 5 &&
        formData.permanent_address.trim().length <= 100,
      nationality: formData.nationality !== "",
      state_of_origin: formData.state_of_origin !== "",
      lga_of_origin: formData.lga_of_origin !== "",
      accommodation:
        formData.accommodation === "Hostel" ||
        formData.accommodation === "Off-Campus",
      residential_address:
        formData.residential_address.trim().length >= 5 &&
        formData.residential_address.trim().length <= 100,
      religion: formData.religion !== "",
      state_of_residence: formData.state_of_residence !== "",
      lga_of_residence: formData.lga_of_residence !== "",
      guardian_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.guardian_name),
      guardian_phone_number:
        /^[0-9]{10,15}$/.test(formData.guardian_phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.guardian_phone_number),
      guardian_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.guardian_email
      ),
      feedback:
        formData.feedback.trim().length >= 5 &&
        formData.feedback.trim().length <= 1000,
      passport_image: validateImage(formData.passport_image),
    };

    setValidation(newValidation);

    const updatedForm = {
      ...formData,
      ["phone_number"]: formData.phone_number.startsWith("+")
        ? Number("0" + formData.phone_number.slice(4))
        : Number(formData.phone_number),
      ["guardian_phone_number"]: formData.guardian_phone_number.startsWith("+")
        ? Number("0" + formData.guardian_phone_number.slice(4))
        : Number(formData.guardian_phone_number),
    };

    const form = new FormData();

    for (const key in updatedForm) {
      form.append(key, updatedForm[key]);
    }

    // Check if form is valid 🔍😒
    try {
      if (Object.values(newValidation).every((isValid) => isValid)) {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
          setSubmitted(false);
          setSubmitError(true); // Shows us an Error below the submit button
          setSubmitErrorMes(["Unable to submit data. Please try again."]); // Error Message
          setButtonColor(true);
        }, 30000);
        // API endpoint for the form.
        // Do not use '/registration' as your end point [If you must go to vite.config.js file and comment out the server field before building]

        if (!navigator.onLine) {
          setSubmitted(false);
          setSubmitError(true); // Shows us an Error below the submit button
          setSubmitErrorMes(["Can't connect to the server."]); // Error Message
          clearTimeout(timeout);
          setButtonColor(true);
        }
        const response = await fetch(
          //https://ece-unn-db-backend-main.onrender.com/api/create/student
          "https://ece-unn-db-backend-main.onrender.com/api/create/student",
          {
            method: "POST",
            body: form,
            signal: controller.signal,
          }
        );
        // Response data must have identical fields to that of the request and must all be strings.
        // The file URL location of the file(image) in the CDN must be returned

        if (!response) {
          clearTimeout(timeout);
          setSubmitted(false);
          setSubmitError(true); // Shows us an Error below the submit button
          setSubmitErrorMes(["No response from server"]); // Error Message
          setButtonColor(true);
        }
        // const check = await response.text();
        // console.log(check);

        const ServerRes = await response.json();

        if (
          ServerRes.hasOwnProperty("status") &&
          ServerRes["status"] == "failed"
        ) {
          clearTimeout(timeout);
          setSubmitted(false);
          setSubmitError(true); // Shows us an Error below the submit button
          setSubmitErrorMes([ServerRes.message]); // Error Message
          setButtonColor(true);
          return;
        }

        if (ServerRes.errors) {
          const { errors } = ServerRes;
          let list = [];
          for (let key in errors) {
            list.push(errors[key][0]);
          }
          clearTimeout(timeout);
          setSubmitted(false);
          setSubmitError(true); // Shows us an Error below the submit button
          setSubmitErrorMes([...list]); // Error Message
          setButtonColor(true);
          return;
        }
        const { student } = ServerRes.data;
        clearTimeout(timeout);
        getData(student);
        //console.log(student);
        submisssion(true);
      } else {
        alert("Please fill out all required fields."); // this is basically useless 😂
      }
    } catch (error) {
      console.error("Error submittiong data:", error);
    }
  };

  // Components
  return (
    <>
      <div className="fs-5 mt-2 mb-4">Student Information</div>
      {/* FORM FIELDS */}
      <form className={`row g-3 mb-5`} onSubmit={handleSubmit}>
        {/* Surname */}
        <div className="col-md-4">
          <label htmlFor="validationSurname" className="form-label">
            Surname
          </label>
          <input
            name="last_name"
            type="text"
            className={`form-control ${
              validation.last_name ? "is-valid" : "is-invalid"
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
            name="first_name"
            type="text"
            className={`form-control ${
              validation.first_name ? "is-valid" : "is-invalid"
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
            name="middle_name"
            type="text"
            className={`form-control ${
              validation.middle_name ? "is-valid" : "is-invalid"
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
            name="reg_number"
            type="text"
            className={`form-control ${
              validation.reg_number ? "is-valid" : "is-invalid"
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
            id="validationLevel"
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
            name="date_of_birth"
            type="date"
            className={`form-control ${
              validation.date_of_birth ? "is-valid" : "is-invalid"
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
            name="phone_number"
            type="tel"
            className={`form-control ${
              validation.phone_number ? "is-valid" : "is-invalid"
            }`}
            id="validationPhoneNumber"
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
            id="validationPermanentAddress"
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
            id="validationStateOrigin"
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
            name="lga_of_origin"
            className={`form-select ${
              validation.lga_of_origin ? "is-valid" : "is-invalid"
            }`}
            id="validationLGAOrigin"
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
          <div className="valid-feedback">Good!</div>
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
            id="validationResidentialAddress"
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
            id="validationStateResidence"
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
            name="lga_of_residence"
            className={`form-select ${
              validation.lga_of_residence ? "is-valid" : "is-invalid"
            }`}
            id="validationLGAResidence"
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
            name="passport_image"
            type="file"
            className={`form-control ${
              validation.passport_image ? "is-valid" : "is-invalid"
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
            {"Suggestions for the Department (Anonymous Feedback)"}
          </label>
          <textarea
            rows={6}
            name="feedback"
            type="text"
            className={`form-control ${classes.height} ${
              validation.feedback ? "is-valid" : "is-invalid"
            }`}
            id="validationSuggestion"
            onChange={handleChange}
            required
          />

          {validation.feedback && (
            <div className="valid-feedback d-flex">
              Good!
              <div className="ms-auto">{formData.feedback.length}/1000</div>
            </div>
          )}

          {!validation.feedback && (
            <div className="invalid-feedback d-flex">
              Write a feedback or suggestion for the Department!
              <div className="ms-auto">{formData.feedback.length}/1000</div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-12 col-md-4 mt-4 mb-0 text-center">
          <button
            className={`btn ${
              buttonColor ? classes.greenButton : classes.greyButton
            }  w-100`}
            type="submit"
          >
            {!submitted ? (
              "Submit"
            ) : (
              <div
                class={`spinner-border text-secondary ${classes.smallSpinner}`}
                role="status"
              ></div>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

/*
LIST OF FIELDS
last_name (String)
first_name (String)
middle_name (String)
reg_number (String)
level (String)
date_of_birth (String)
gender (String)
email (String)
phone_number (Number)
permanent_address (String)
nationality (String)
state_of_origin (String)
lga_of_origin (String)
accommodation (String)
residential_address (String)
religion (String)
state_of_residence (String)
lga_of_residence (String)
guardian_name (String)
guardian_phone_number (Number)
guardian_email (String)
suggestion (String)
file (Image)
*/
