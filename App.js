import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";


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