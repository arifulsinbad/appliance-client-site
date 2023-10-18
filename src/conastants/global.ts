"use client";
type SelectOptions = { label: string; value: string }[];
export const genderOption: SelectOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];
