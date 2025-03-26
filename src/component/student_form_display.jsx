import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";
import myImage from "../assets/Picture5.png";

export default function Registration({ savedData }) {
  const {
    surname,
    firstname,
    middlename,
    matric_number,
    level,
    dob,
    gender,
    email,
    phone,
    permanent_address,
    nationality,
    state_of_origin,
    local_government_of_origin,
    accommodation,
    residential_address,
    religion,
    state_of_residence,
    local_government_of_residence,
    file, // The file URL
  } = savedData;

  return (
    <>
      <div className={`row mx-5 gy-3 px-5 ${classes.box}`}>
        <div className="col-md-12 text-center pb-4 pt-4">
          <img
            src={!file ? myImage : file}
            className="rounded"
            alt="Uploaded Preview"
            style={{ width: "170px", height: "170px", objectFit: "cover" }}
          />
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Surname:</b> {surname}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>First Name:</b> {firstname}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Middle Name:</b> {middlename}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Level:</b> {level}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Matric Number:</b> {matric_number}
        </div>

        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Date of Birth:</b> {dob}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Gender:</b> {gender}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Phone Number:</b> {phone}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Religion:</b> {religion}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Email:</b> {email}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Permanent Address:</b> {permanent_address}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Nationality:</b> {nationality}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>State of Origin:</b> {state_of_origin}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>LGA of Origin:</b> {local_government_of_origin}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Residential Address:</b> {residential_address}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Accommodation:</b> {accommodation}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>State of Residence:</b> {state_of_residence}
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>LGA of Residence:</b> {local_government_of_residence}
        </div>
      </div>
    </>
  );
}
