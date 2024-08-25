export const apiUrl = "https://thewarriorsociety.com";

export const s3Url = "https://mario-warrior.s3.ap-southeast-1.amazonaws.com";
export const googleMapApiKey = "AIzaSyALkPTaRbz9gPqS00opLeJnOAPaorBdjsU";
export const imageUrl = (url) => `${s3Url}/${url}`;

export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};

export const mediaUrl = (url) => `${s3Url}/${url}`;
export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const CreateFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const firebaseVapidObject = {
  vapidKey: "",
};

export const formRegEx = /([a-z])([A-Z])/g;
export const formRegExReplacer = "$1 $2";

export var recordsLimit = 10;
export var recordsLimit50 = 50;

export const ReturnFormatedNumber = (number) => {
  let newNumber = number?.slice(2);
  newNumber = newNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) - $2 $3");
  return newNumber;
};

export const falsyArray = [
  null,
  undefined,
  "",
  0,
  false,
  NaN,
  "null",
  "undefined",
  "false",
  "0",
  "NaN",
];

export const numberRegEx = /[^0-9]+/g;
