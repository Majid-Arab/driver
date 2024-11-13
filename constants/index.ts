import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  noResult,
  message,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect ride is just a tap away!",
    description:
      "Your journey begins with Ryde. Find your ideal ride effortlessly.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Best car in your hands with Ryde",
    description:
      "Discover the convenience of finding your perfect ride with Ryde",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description:
      "Enter your destination, sit back, and let us take care of the rest.",
    image: images.onboarding3,
  },
];

export interface FormState {
  vehicle_type: string;
  age: string;
  gender: string;
  DOB: string;
  brand: string;
  registrationPlate: string;
  cnic_front: string;
  cnic_back: string;
  vehicleModel: string;
  drivingLicenseImage: string;
  vehicleImage: string;
}

export const driverOnboarding = [
  {
    id: 1,
    title: "Vehicle",
    image: images.onboarding1,
    options: [
      { label: "Car", value: "car" },
      { label: "Bike", value: "bike" },
      { label: "Rikshaw", value: "rikshaw" },
    ],
    key: "vehicle",
  },
  {
    id: 2,
    title: "Personal Details",
    description: "Tell us more about yourself.",
    fields: [
      { label: "Age", placeholder: "Your Age", key: "age" },
      { label: "Gender", placeholder: "Your Gender", key: "gender" },
      { label: "Date of birth", placeholder: "Your date of birth", key: "DOB" },
    ],
  },
  {
    id: 3,
    title: "Upload Your CNIC Picture",
    key: "images",
    type: "multi-image",
    images: [
      { label: "CNIC Front", key: "front" },
      { label: "CNIC Back", key: "back" },
    ],
  },
  {
    id: 4,
    title: "Upload Your Picture",
    key: "picture",
    type: "image",
    images: [{ label: "Your Picture", key: "picture" }],
  },
  {
    id: 5,
    title: "Vehicle Details",
    description: "Tell us more about your vehicle.",
    fields: [
      {
        label: "Brand",
        placeholder: "Search for vehicle brand",
        key: "brand",
        type: "dropdown",
      },
      {
        label: "Registration Plate",
        placeholder: "Your Registration Plate",
        key: "registration-plate",
        type: "input",
      },
      {
        label: "Vehicle Model Year",
        placeholder: "e.g., 2016",
        key: "vehicle-model",
        type: "input",
      },
    ],
    key: "pictures",
    type: "multi-image",
  },
];

export const data = {
  onboarding,
};
