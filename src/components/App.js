import React, { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItems }) {
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

function Item({ id, description, quantity, packed, onDelete, onTogglePacked, onUpdateQuantity }) {
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
        {description} (x
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className={`quantity-input ${packed ? "packed" : ""}`}
          min="1"
          disabled={packed} // Disable quantity input if packed
        />)
      </span>
      <button className="delete-button" onClick={() => onDelete(id)}>
        X
      </button>
    </li>
  );
}



function PackingList({ items, onDeleteItem, onTogglePacked, onUpdateQuantity }) {
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


function Stats({ items }) {
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


function App() {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleUpdateQuantity(id, newQuantity) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.description.localeCompare(b.description);
    } else if (sortOption === "packed") {
      return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div className="app">
      <Logo />
      <div className="form-and-sort">
        <select
          className="sort-dropdown"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="alphabetical">Sort Alphabetically</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <Form onAddItems={handleAddItems} />
      </div>
      <PackingList
        items={sortedItems}
        onDeleteItem={handleDeleteItem}
        onTogglePacked={handleTogglePacked}
        onUpdateQuantity={handleUpdateQuantity} // Pass the function
      />
      <Stats items={items} />
    </div>
  );
}


export default App;