import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";
import myImage from "../assets/Picture1.png";
import Form1 from "../component/student_form1";
import Registration from "../component/student_form_display";

function AlertMessage({ onLine, error, errorMes, isSubmited, removeError }) {
  return (
    <div className={`${classes.alert}`}>
      {!onLine && !isSubmited && (
        <div className={`alert alert-danger text-center`} role="alert">
          No Internet Connection.
        </div>
      )}
      {error &&
        !isSubmited &&
        errorMes.map((mes, index) => (
          <div
            key={index}
            className="alert alert-warning alert-dismissible fade show text-center"
            role="alert"
          >
            {mes}
            <button
              type="button"
              className={`btn-close ${classes.closeBtn}`}
              onClick={() => {
                removeError(index);
              }}
              aria-label="Close"
            ></button>
          </div>
        ))}
    </div>
  );
}

export default function RegForm() {
  const [submitted, setSubmitted] = useState(false);
  const [returnedData, setReturnedData] = useState({});
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMes, setSubmitErrorMes] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <div className="container pb-5 px-3 px-md-3">
        <div className="container d-flex flex-column align-items-center mb-4 mt-3">
          <div className={`d-flex px-0 mb-4`}>
            <img
              className={`${classes.logo}`}
              src={myImage}
              alt="Cropped Image"
            />
          </div>
          <div className="fs-5">Welcome to the</div>
          <div className="fs-5 text-center mb-1">
            Department of Electronic and Computer Engineering
          </div>
          <div className="fs-5 text-center fw-bold mb-4">Student Database</div>
          {!submitted && (
            <div className={`fw-light text-center`}>
              Please fill the following fields carefully and honestly
            </div>
          )}
          {submitted && (
            <div className={`fw-light pb-3 text-center`}>
              You have successfully completed your registration.
            </div>
          )}
        </div>
        <div
          className={`my-4 ${submitted ? "d-flex justify-content-center" : ""}`}
        >
          {!submitted && (
            <Form1
              submisssion={(bool) => {
                setSubmitted(bool);
              }}
              getData={(data) => {
                setReturnedData(data);
              }}
              getErrorMes={(data) => {
                setSubmitErrorMes(data);
              }}
              getError={(data) => {
                setSubmitError(data);
              }}
              isOnline={isOnline}
            />
          )}
          {submitted && <Registration savedData={returnedData} />}
        </div>
        <AlertMessage
          onLine={isOnline}
          error={submitError}
          errorMes={[...submitErrorMes]}
          isSubmited={submitted}
          removeError={(index) => {
            setSubmitErrorMes((prev) => {
              const newMes = [...prev];
              newMes.splice(index, 1);
              return newMes;
            });
          }}
        />
      </div>
    </>
  );
}
