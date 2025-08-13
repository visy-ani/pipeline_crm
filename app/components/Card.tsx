"use client";
import React from "react";
import { Deal } from "../types";
import { currency, daysAgo } from "../utils";

type CardProps = {
  deal: Deal;
  onDragStart: (id: string) => (e: React.DragEvent) => void;
  onClick: () => void;
};

export default function Card({ deal, onDragStart, onClick }: CardProps) {
  return (
    <article
      key={deal.id}
      className="card"
      draggable
      onDragStart={onDragStart(deal.id)}
      onClick={onClick}
      onMouseMove={(e) => {
        const t = e.currentTarget as HTMLElement;
        const r = t.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        t.style.setProperty("--rx", `${dy * -6}deg`);
        t.style.setProperty("--ry", `${dx * 6}deg`);
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLElement;
        t.style.setProperty("--rx", `0deg`);
        t.style.setProperty("--ry", `0deg`);
      }}
    >
      <div className="card-top">
        <div className="badge">{deal.company}</div>
        <div className={`prob p-${Math.round(deal.probability / 10)}`}>
          {deal.probability}%
        </div>
      </div>
      <h4 className="title">{deal.title}</h4>
      <div className="meta">
        <span className="owner">👤 {deal.owner}</span>
        <span className="value">💰 {currency(deal.value)}</span>
      </div>
      <div className="sub">
        <span>Added {daysAgo(deal.createdAt)}</span>
        {deal.tags && deal.tags.length > 0 && (
          <div className="tags">
            {deal.tags.map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
