import React, { useMemo } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import PersonalForm from "../modules/PersonalForm";

const PersonalDetails = ({ handleClick }) => {
  const [details, setDetails] = useState();
  const session = JSON.parse(localStorage.getItem("jwt"));
  const user_id = useMemo(() => session.id, [session]);

  useEffect(() => {
    getDoc(doc(db, "user", user_id)).then((res) => {
      const data = res.data();
      setDetails(data);
    });
  }, [user_id]);

  return (
    <div>
      {details && <PersonalForm details={details} handleClick={handleClick} />}
    </div>
  );
};

export default PersonalDetails;
