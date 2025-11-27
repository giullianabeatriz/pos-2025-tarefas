export default function CategoriesGrid({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="grid">
      {categories.map((cat) => (
        <div
          key={cat}
          className="card"
          style={{
            background: selectedCategory === cat ? "#ffb6c1" : "white",
            border: selectedCategory === cat ? "2px solid #ff4d80" : "none",
            fontWeight: selectedCategory === cat ? "bold" : "normal",
            cursor: "pointer"
          }}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}
