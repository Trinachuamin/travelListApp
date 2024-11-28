import React from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onTogglePacked, onUpdateQuantity }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
            onDelete={onDeleteItem}
            onTogglePacked={onTogglePacked}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </ul>
    </div>
  );
}
