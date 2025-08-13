import React from "react";
import { Deal, Stage } from "../types";
import Card from "./Card";

type ColumnProps = {
  stage: Stage;
  deals: Deal[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (stage: Stage) => (e: React.DragEvent) => void;
  onDragStart: (id: string) => (e: React.DragEvent) => void;
  onCardClick: (deal: Deal) => void;
};

export default function Column({
  stage,
  deals,
  onDragOver,
  onDrop,
  onDragStart,
  onCardClick,
}: ColumnProps) {
  return (
    <section
      className={`col col-${stage.toLowerCase()}`}
      onDragOver={onDragOver}
      onDrop={onDrop(stage)}
    >
      <div className="col-head">
        <h3>{stage}</h3>
        <span className="pill">{deals.length}</span>
      </div>
      <div className="col-body">
        {deals.map((d) => (
          <Card
            key={d.id}
            deal={d}
            onDragStart={onDragStart}
            onClick={() => onCardClick(d)}
          />
        ))}
      </div>
    </section>
  );
}
