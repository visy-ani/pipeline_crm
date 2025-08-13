import React from "react";
import Header from "../app/components/Header";

export default {
  title: "Components/Header",
  component: Header,
};

export const Default = () => (
  <Header
    query=""
    setQuery={() => {}}
    ownerFilter="all"
    setOwnerFilter={() => {}}
    owners={["Anish", "Sam"]}
    sortKey="value"
    setSortKey={() => {}}
    theme="dark"
    setTheme={() => {}}
    setShowAdd={() => {}}
  />
);
