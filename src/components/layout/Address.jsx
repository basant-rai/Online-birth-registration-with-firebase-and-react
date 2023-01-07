import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import AddressForm from "../modules/AddressForm";

const Address = ({ handleClick }) => {
  const [details, setDetails] = useState();
  const session = JSON.parse(localStorage.getItem("jwt"));
  const user_id = useMemo(() => session.id, [session]);

  useEffect(() => {
    getDoc(doc(db, "user_address", user_id)).then((res) => {
      const data = res.data();
      setDetails(data);
    });
  }, [user_id]);

  return (
    <div>
      {details && <AddressForm handleClick={handleClick} details={details} />}
    </div>
  );
};

export default Address;
