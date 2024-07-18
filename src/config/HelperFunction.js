import { toast } from "react-toastify";
import { formRegEx, formRegExReplacer, validateEmail } from "./apiUrl";
import moment from "moment";
import validator from "validator";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
export const validateDisciplineFields = (discipline) => {
  const currentYear = Number(moment().format("YYYY"));
  for (let i = 0; i < discipline.length; i++) {
    const element = discipline[i];
    if (Object.keys(element) == 0) {
      toast.error(`Please select domain for discipline ${i + 1}!`);
      return false;
    }
    for (let key in element) {
      if (key === "questions") {
        // qMo = question number
        for (let qNo = 0; qNo < element[key].length; qNo++) {
          if (!element[key][qNo]?.answer) {
            toast.error(
              `Please fill answer field for question ${qNo + 1} at position ${
                i + 1
              }`
            );
            return false;
          }
          if (
            element[key][qNo]?.question ==
              "What year did you begin training?" &&
            (currentYear < Number(element[key][qNo]?.answer) ||
              Number(element[key][qNo]?.answer) < 1900)
          ) {
            toast.error(
              `Please enter valid year for question ${qNo + 1} at position ${
                i + 1
              }`
            );
            return false;
          }
        }
      }
      if (key == "martialArtType" && element["domain"] !== "martial arts") {
        continue;
      }
      if (!element[key]) {
        toast.error(
          `Please fill the ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} field at position ${i + 1}!`
        );
        return false;
      }
    }
  }
  return true;
};
export const validateExperiencesField = (experiences) => {
  for (let i = 0; i < experiences.length; i++) {
    for (let key2 in experiences[i]) {
      if (
        ["startDate", "endDate"]?.includes(key2) &&
        [null, undefined, ""].includes(experiences[i][key2])
      ) {
        toast.error(
          `Please select valid ${key2
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} for expreience ${i + 1}`
        );
        return false;
      }
      if (
        ["startDate", "endDate"]?.includes(key2) &&
        moment().isBefore(moment(experiences[i][key2]))
      ) {
        toast.error(
          `${key2
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} cannot be greater than current date for expreience ${
            i + 1
          }!`
        );
        return false;
      }
      if (experiences[i][key2] === "" || experiences[i][key2] === null) {
        toast.error(`Please fill previous experience fields at position ${i + 1}`);
        return false;
      }
      if (
        ["startDate", "endDate"]?.includes(key2) &&
        moment(experiences[i][key2]?.$d || experiences[i][key2])?.isAfter(
          moment()
        )
      ) {
        toast.error(
          `${key2
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} at position ${
            i + 1
          } cannot be greater than current date`
        );
        return false;
      }
      if (key2 === "startDate" || key2 === "endDate") {
        experiences[i] = {
          ...experiences[i],
          [key2]: moment(
            experiences[i][key2]?.$d || experiences[i][key2]
          ).format("MM/DD/YYYY"),
        };
      }
      if (key2 === "stillWorking") {
        experiences[i] = {
          ...experiences[i],
          [key2]: experiences[i][key2] ? true : false,
        };
      }
    }
    if (
      moment(experiences[i]?.startDate)?.isAfter(
        moment(experiences[i]?.endDate)
      )
    ) {
      toast.error("Start date should be less than end date");
      return false;
    }
  }

  return true;
};
const socialLinks = ["facebook", "instagram", "twitter", "linkedin"];
export const validateUserFields = (body) => {
  for (let key in body) {
    // social links optional
    if (socialLinks.includes(key) && body[key] === "") {
      continue;
    }
    if (body[key] == "" || body[key] == null) {
      toast.error(
        `Please fill ${key.replace(formRegEx, formRegExReplacer)} field!`
      );
      return false;
    }
    if (key == "email" && !validateEmail(body[key])) {
      toast.error("Please enter correct email");
      return false;
    }
    if (
      ["phone", "contact", "phoneNumber"].includes(key) &&
      !validator.isMobilePhone(body[key])
    ) {
      toast.error("Please enter correct phone number");
      return false;
    }
    if (
      ["password", "passwordConfirm"]?.includes(key) &&
      body[key]?.length < 8
    ) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    // social media links validation
    if (socialLinks.includes(key) && body[key] && !validator.isURL(body[key])) {
      toast.error(
        `Please enter valid url for ${key
          .replace(formRegEx, formRegExReplacer)
          .toLowerCase()}!`
      );
      return false;
    }
  }
  // check if password and confirmpassword key exist if yes then check if they are equal
  if (
    body?.password &&
    (body?.passwordConfirm || body?.confirmPassword) &&
    body?.password !== (body?.passwordConfirm || body?.confirmPassword)
  ) {
    toast.error("Password and confirm password must be same");
    return false;
  }
  return true;
};

export const showTime = (momentDate, momentTime) => {
  moment(`${momentDate} ${momentTime}`, "YYYY-MM-DD HH:mm:ss").format();
};
export const getTimeStamp = (date) => {
  const now = moment();
  const givenDate = moment(date);
  const duration = moment.duration(now.diff(givenDate));

  const years = duration.years();
  const months = duration.months();
  const weeks = duration.weeks();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (years > 0) return `${years} ${years == 1 ? "Year" : "Years"} Ago`;
  if (months > 0) return `${months} ${months == 1 ? "Month" : "Months"} Ago`;
  if (weeks > 0) return `${weeks} ${weeks == 1 ? "Week" : "Weeks"} Ago`;
  if (days > 0) return `${days} ${days == 1 ? "Day" : "Days"} Ago`;
  if (hours > 0) return `${hours} ${hours == 1 ? "Hour" : "Hours"} Ago`;
  if (minutes > 0) return `${minutes} Minutes Ago`;

  return "Just now";
};
export const UploadVideosToAwsBySignedUrl = async (urlsArray, videos) => {
  const promises = urlsArray.map((url, index) => {
    return axios.put(url, videos[index], {
      headers: {
        "Content-Type": videos[index]?.name?.split(".")[1],
        // "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "69420",
      },
    });
  });
  const results = await Promise.allSettled(promises);
  return results;
};
export const UploadImagesToAwsBySignedUrl = async (urlsArray, images) => {
  const promises = urlsArray.map((url, index) => {
    return axios.put(url, images[index], {
      headers: {
        "Content-Type": images[index]?.name?.split(".")[1],
        "ngrok-skip-browser-warning": "69420",
      },
    });
  });
  const results = await Promise.allSettled(promises);
  return results;
};
export const separateMedia = (media) => {
  const images = [];
  const videos = [];
  media.forEach((ele) => {
    const stringFile = ele?.type?.split("/")[1];
    const wmvFile = ele?.name?.split(".")[1];

    if (
      typeof ele === "object" &&
      ["jpg", "jpeg", "png", "jfif", "avif"]?.includes(stringFile)
    ) {
      images.push(ele);
    } else if (
      (typeof ele === "object" &&
        ["quicktime", "mp4", "x-matroska", "wmv"]?.includes(stringFile)) ||
      ["mp4", "mov", "mkv", "wmv"]?.includes(wmvFile)
    ) {
      videos.push(ele);
    }
  });
  return { images, videos };
};

export function calculateBirthdayMessage(dateOfBirth) {
  const birthDate = moment(dateOfBirth);
  const today = moment();
  let nextBirthday = birthDate.set("year", today.year());

  // Check if this year's birthday has already passed
  if (today.isAfter(nextBirthday)) {
    // Calculate the birthday for next year
    nextBirthday = birthDate.add(1, "years");
  }

  // Calculate the difference in days to determine the message format
  const daysUntilBirthday = nextBirthday.diff(today, "days");

  if (daysUntilBirthday > 30) {
    // If the birthday is more than 30 days away, format the date
    return `has birthday on ${nextBirthday.format("MM/DD/YYYY")}`;
  } else {
    // If the birthday is within the next 30 days or has just passed, use fromNow()
    return `has birthday ${nextBirthday.fromNow()}`;
  }
}
export function formatTags(tags) {
  const maxDisplayCount = 1;
  if (tags.length === 1) {
    return `with ${tags[0]?.firstName}`;
  } else if (tags.length >= 2) {
    const firstFewNames = tags.slice(0, maxDisplayCount);
    const remainingCount = tags.length - maxDisplayCount;
    return `with ${firstFewNames
      .map((ele) => ele?.firstName)
      .join(", ")} and ${remainingCount} others`;
  } else {
    return null;
  }
}
export const extractTextFromElement = (element) => {
  // Base case: if the element is directly a string or number, return it
  if (typeof element === "string" || typeof element === "number") {
    return element.toString();
  }

  // If the element is a React element or an object with props and children,
  // recursively extract text from children
  if (element && element.props && element.props.children) {
    if (Array.isArray(element.props.children)) {
      // If children is an array, iterate and extract text from each child
      return element.props.children
        .map((child) => extractTextFromElement(child))
        .join(" ");
    } else {
      // If children is a single element, directly extract text from it
      return extractTextFromElement(element.props.children);
    }
  }

  // If we encounter a structure that doesn't match the above (e.g., empty elements, booleans),
  // return an empty string to avoid errors
  return "";
};
export const handleFieldError = (errorFields, field, actualField) => {
  const theField = actualField ? actualField : field;

  return (
    ((Array.isArray(eval(theField)) && eval(theField)?.length === 0) ||
      [undefined, null, ""].includes(eval(theField))) &&
    errorFields?.includes(field)
  );
};
export const validateDisciplineErrors = (discipline) => {
  const errorFieldsArray = Array.from({ length: discipline.length }, () => []);
  for (let i = 0; i < discipline.length; i++) {
    const element = discipline[i];
    if (Object.keys(element) == 0) {
      errorFieldsArray[i].push("domain");
    }
    for (let key in element) {
      if (key === "questions") {
        for (let qNo = 0; qNo < element[key].length; qNo++) {
          if (!element[key][qNo]?.answer) {
            errorFieldsArray[i].push(qNo);
          }
        }
      }
      if (key == "martialArtType" && element["domain"] !== "Martial Arts") {
        continue;
      }
      if (!element[key]) {
        errorFieldsArray[i].push(key);
      }
    }
  }
  return errorFieldsArray;
};
export const validateExperienceErrors = (experiences) => {
  const errorFieldsArray = Array.from({ length: experiences.length }, () => []);
  for (let i = 0; i < experiences.length; i++) {
    for (let key2 in experiences[i]) {
      if (
        ["startDate", "endDate"]?.includes(key2) &&
        [null, undefined, ""].includes(experiences[i][key2])
      ) {
        errorFieldsArray[i].push(key2);
      }
      if (
        ["startDate", "endDate"]?.includes(key2) &&
        moment().isBefore(moment(experiences[i][key2]))
      ) {
        errorFieldsArray[i].push(key2);
      }
      if (experiences[i][key2] === "" || experiences[i][key2] === null) {
        errorFieldsArray[i].push(key2);
      }
      if (
        ["startDate", "endDate"]?.includes(key2) &&
        moment(experiences[i][key2]?.$d || experiences[i][key2])?.isAfter(
          moment()
        )
      ) {
        errorFieldsArray[i].push(key2);
      }
    }
    if (
      moment(experiences[i]?.startDate)?.isAfter(
        moment(experiences[i]?.endDate)
      )
    ) {
      errorFieldsArray[i].push("startDate");
      errorFieldsArray[i].push("endDate");
    }
  }

  return errorFieldsArray;
};
export const filterShared = (shares) => {
  return shares.reduce((acc, current) => {
    if (acc?.find((ele) => ele?._id === current?._id)) {
      return acc;
    } else {
      acc.push(current);
    }
    return acc;
  }, []);
};
export const filterImagesVideos = (files) => {
  const images = [];
  const videos = [];
  files.forEach((ele) => {
    const extension = ele?.split(".");
    if (
      ["jfif", "png", "jpg", "jpeg", "avif"].includes(
        extension[extension.length - 1]
      )
    ) {
      images.push(ele);
    } else if (
      ["mp4", "mov", "mkv"].includes(extension[extension.length - 1])
    ) {
      videos.push(ele);
    }
  });
  return { images, videos };
};
export const displayDate = (inputDate) => {
  const now = moment();
  const momentDate = moment(inputDate);
  const diffDays = now.diff(momentDate, "days");

  if (diffDays <= 31) {
    return momentDate.fromNow();
  } else {
    return momentDate.format("MM/DD/YYYY");
  }
};
