import React from "react";
import Card from "../app/components/Card";
import { Deal } from "../app/types";

const deal: Deal = {
  id: "d1",
  title: "Enterprise Suite",
  company: "Globex Corp",
  owner: "Anish",
  value: 92000,
  stage: "New",
  probability: 20,
  createdAt: new Date().toISOString(),
  tags: ["priority", "enterprise"],
};

export default {
  title: "Components/Card",
  component: Card,
};

export const Default = () => (
  <Card deal={deal} onDragStart={() => () => {}} onClick={() => {}} />
);
