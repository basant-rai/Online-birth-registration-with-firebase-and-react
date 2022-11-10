import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
const User = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div>
      {users.map((user) => (
        <>
          <h1 className="font-bold">
            Name:
            <span className="fs-3">
            {user.Firstname} {user.Lastname}
            </span>
          </h1>
        </>
      ))}
    </div>
  );
};

export default User;
