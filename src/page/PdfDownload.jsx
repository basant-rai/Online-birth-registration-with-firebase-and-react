import { PDFViewer } from "@react-pdf/renderer";
import Pdf from "../components/layout/Pdf";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase-config";
import Navbar from "../components/layout/Navbar";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PdfDownload = () => {
  const [address, setAddress] = useState();
  const [info, setInfo] = useState();
  const [user, setUser] = useState();
  const session = JSON.parse(localStorage.getItem("jwt"));
  const user_id = useMemo(() => session.id, [session]);
  console.log();
  useEffect(() => {
    getDoc(doc(db, "user_address", user_id)).then((res) => {
      const data = res.data();
      setAddress(data);
    });
    getDoc(doc(db, "user_info", user_id)).then((res) => {
      const data = res.data();
      setInfo(data);
    });
    getDoc(doc(db, "user", user_id)).then((res) => {
      const data = res.data();
      setUser(data);
    });
  }, [user_id]);
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("jwt");
    return navigate("/");
  };

  return (
    <div className="flex">
      {user && (
        <>
          <PDFViewer className="min-h-screen w-1/2">
            {user && info && address && (
              <Pdf user={user} info={info} address={address} />
            )}
          </PDFViewer>
        </>
      )}
      <div className=" mx-auto">
        <Navbar />
        <button
          onClick={logout}
          className="bg-primary px-5 py-2 mt-2 rounded text-white"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default PdfDownload;
