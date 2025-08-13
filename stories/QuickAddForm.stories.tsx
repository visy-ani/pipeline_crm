import React from "react";
import QuickAddForm from "../app/components/QuickAddForm";

export default {
  title: "Components/QuickAddForm",
  component: QuickAddForm,
};

export const Default = () => (
  <QuickAddForm owners={["Anish", "Sam", "Priya"]} onCreate={() => {}} />
);
