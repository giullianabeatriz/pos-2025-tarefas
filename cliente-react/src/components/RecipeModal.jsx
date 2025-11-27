import "./../css/style.css";

function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{recipe.name}</h2>

        <p><strong>Categoria:</strong> {recipe.category}</p>

        <p><strong>Descrição:</strong> {recipe.description}</p>

        <p><strong>Receita completa:</strong></p>
        <p>{recipe.details}</p>

        <button className="modal-close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default RecipeModal;
