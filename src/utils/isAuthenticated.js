export const isAuthenticated = () => {
  return localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : false;
};

export const getUserid = () => {
  return localStorage.getItem("jwt")
}