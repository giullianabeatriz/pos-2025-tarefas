function RecipesGrid({ recipes, onRecipeClick }) {
  return (
    <div className="grid">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card" onClick={() => onRecipeClick(recipe)}>
          {recipe.name}
        </div>
      ))}
    </div>
  );
}

export default RecipesGrid;
