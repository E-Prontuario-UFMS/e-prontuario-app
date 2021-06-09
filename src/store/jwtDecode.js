import { compareAsc } from "date-fns";
import jwtDecode from "jwt-decode";

export function isAValidToken(token) {
  const { exp: expirationDateInSeconds } = jwtDecode(token);

  const expirationDate = toDateTime(expirationDateInSeconds);

  if (!isExpirationDateAfterCurrentDate(expirationDate)) {
    throw Error("Token Expirado");
  }
}

function isExpirationDateAfterCurrentDate(expirationDate) {
  return compareAsc(expirationDate, new Date()) === 1;
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
