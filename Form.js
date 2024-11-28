import React, { useState } from "react";
export default function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    function handleSubmit(e) {
      e.preventDefault();
  
      if (!description.trim()) {
        alert("Please enter a valid item description.");
        return;
      }
  
      const newItem = {
        id: Date.now(),
        description: description.trim(),  
        quantity,
        packed: false,
      };
  
      onAddItems(newItem);
      setDescription("");
      setQuantity(1);
    }
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need to pack?</h3>
        <label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
            <option value="3">5</option>
            <option value="3">6</option>
            <option value="3">7</option>
            <option value="3">8</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    );
  }