import noty from "./noty";

export default function handleError(error) {
  // Sign out ff JWT token is expired
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("currentUser");
    window.location.reload();
  }

  noty("error: " + JSON.stringify(error), "error");
}
