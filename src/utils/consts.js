export const ACCESS_TOKEN = "access_token";
const APP_NAME = "yumMeals";
export const CAPITALIZED_APP =
  APP_NAME[0].toUpperCase() + APP_NAME.slice(1).toLowerCase();

export const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

export const SERVER_URL=`${BASE_URL}/api`
