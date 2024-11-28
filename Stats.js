import React from "react";

export default function Stats({ items }) {
  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percentage = total > 0 ? Math.round((packed / total) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {total > 0
          ? `You have ${total} items on your list, and ${packed} packed (${percentage}%).`
          : "Start adding some items to your packing list!"}
      </em>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </footer>
  );
}
