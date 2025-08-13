import React from "react";
import { Deal, Stage, stages } from "../types";
import { currency } from "../utils";

type DealDetailProps = {
  deal: Deal;
  onMove: (s: Stage) => void;
};

export default function DealDetail({ deal, onMove }: DealDetailProps) {
  return (
    <div className="detail">
      <h3>{deal.title}</h3>
      <div className="info">
        <div>
          <strong>Company:</strong> {deal.company}
        </div>
        <div>
          <strong>Owner:</strong> {deal.owner}
        </div>
        <div>
          <strong>Value:</strong> {currency(deal.value)}
        </div>
        <div>
          <strong>Stage:</strong> {deal.stage}
        </div>
        <div>
          <strong>Probability:</strong> {deal.probability}%
        </div>
        <div>
          <strong>Created:</strong> {new Date(deal.createdAt).toLocaleString()}
        </div>
        {deal.tags?.length ? (
          <div>
            <strong>Tags:</strong> {deal.tags.join(", ")}
          </div>
        ) : null}
      </div>
      <div className="move">
        {stages.map((s) => (
          <button
            key={s}
            className={`btn ${s === deal.stage ? "disabled" : ""}`}
            disabled={s === deal.stage}
            onClick={() => onMove(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
