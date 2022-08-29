import axios from "axios";
import React, { createContext, useContext, useMemo, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userCollegeData, setUserCollegeData] = useState(null);
  const [collegeData, setCollegeData] = useState([])
  
  const getUserData = async () => {
    setLoading(true);
    console.log("get user Data");
      await axios.get("http://localhost:3001/login").then(async (res) => {
        console.log("Auth Login: ", res.data);
        if(res.data.loggedIn === true){
            // await axios.get(`http://localhost:3001/users/${res.data.user}`).then(res1 => {
            //   setUserData(res1.data);
            // }).catch(err => setError(err))
            setUserData(res.data.user[0])
            getUserCollegeDetails(res.data.user[0].ref)
        }
      })
      .catch(err => {
        setError(err);
      })
  };

  const getUserCollegeDetails = async(ref) => {
    if(ref && ref !== 'NULL'){
      await axios.get(`http://localhost:3001/getCollegeDetailsByUser/${ref}`)
              .then((res) => {
                setUserCollegeData(res.data[0])
              }).catch(err => {
                console.log("User College Details Error :  ", userCollegeData)
              })
    }else{
      console.log(" *** User Clg Ref NULL *** ")
    }
  }

  const fetchCollegeData = async () => {
    console.log("Fetch Colleges")
    setLoading(true)
    await axios
      .get("http://localhost:3001/top10Universities")
      .then(function (response) {
        setCollegeData(response.data);
      })
      .catch(function (error) {
        alert("Error Fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getUserData();
    fetchCollegeData();
  }, []);
  const logout = () => {
    setUserData(null);
  };
  const memoedValue = useMemo(
    () => ({
      userData,
      userCollegeData,
      setUserData,
      loading,
      collegeData,
      getUserData,
      getUserCollegeDetails,
      fetchCollegeData,
      logout,
      error
    }),
    [userData, collegeData]
  );
  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
