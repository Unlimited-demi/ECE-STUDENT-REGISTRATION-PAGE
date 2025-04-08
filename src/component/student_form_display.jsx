import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";
import myImage from "../assets/Picture5.png";

export default function Registration({ savedData }) {
  const {
    last_name,
    first_name,
    middle_name,
    reg_number,
    level,
    date_of_birth,
    gender,
    email,
    phone_number,
    permanent_address,
    nationality,
    state_of_origin,
    lga_of_origin,
    accommodation,
    residential_address,
    religion,
    state_of_residence,
    lga_of_residence,
    guardian_name,
    guardian_phone_number,
    guardian_email,
    passport_url,
    // The file URL
  } = savedData;

  return (
    <>
      <div className={`row mx-5 gy-3 px-5 ${classes.box}`}>
        <div className="col-md-12 text-center pb-4 pt-4">
          <img
            src={!passport_url ? myImage : passport_url}
            className={`rounded-circle ${classes.imgBorder}`}
            alt="Uploaded Preview"
            style={{ width: "170px", height: "170px", objectFit: "cover" }}
          />
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Surname:</b> {last_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>First Name:</b> {first_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Middle Name:</b> {middle_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Level:</b> {level}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Matric Number:</b> {reg_number}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Date of Birth:</b> {date_of_birth}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Gender:</b> {gender}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Phone Number:</b> {"0" + String(phone_number)}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Religion:</b> {religion}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Email:</b> {email}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Permanent Address:</b> {permanent_address}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Nationality:</b> {nationality}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>State of Origin:</b> {state_of_origin}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>LGA of Origin:</b> {lga_of_origin}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Residential Address:</b> {residential_address}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Accommodation:</b> {accommodation}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>State of Residence:</b> {state_of_residence}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>LGA of Residence:</b> {lga_of_residence}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Guardian Name:</b> {guardian_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Guardian Phone Number:</b> {"0" + String(guardian_phone_number)}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 mb-3 ${classes.fontSize1}`}>
          <b>Guardian Email:</b> {guardian_email}
        </div>
      </div>
    </>
  );
}
