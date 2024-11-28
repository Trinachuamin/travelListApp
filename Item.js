import React from "react";

export default function Item({ id, description, quantity, packed, onDelete, onTogglePacked, onUpdateQuantity }) {
  function handleQuantityChange(e) {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(id, newQuantity);
    }
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onTogglePacked(id)}
      />
      <span className={packed ? "packed" : ""}>
        {description}
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className={`quantity-input ${packed ? "packed" : ""}`}
          min="1"
          disabled={packed} // Disable quantity input if packed
        />
      </span>
      <button className="delete-button" onClick={() => onDelete(id)}>
        X
      </button>
    </li>
  );
}
