import { useState } from "react";
import CategoriesGrid from "./components/CategoriesGrid";
import RecipesGrid from "./components/RecipesGrid";
import Pagination from "./components/Pagination";
import RecipeModal from "./components/RecipeModal";

function App() {
  // CATEGORIAS
  const categories = ["Todas", "Doces", "Massas", "Carnes", "Saladas"];

  // RECEITAS
  const allRecipes = [
    { 
      id: 1, 
      name: "Bolo", 
      category: "Doces",
      description: "Bolo de chocolate.",
      details: "Ingredientes: farinha, ovos, açúcar, chocolate e fermento. Modo de preparo: misture tudo, coloque em uma forma untada e asse por 35 minutos."
    },
    { 
      id: 2, 
      name: "Pudim", 
      category: "Doces",
      description: "Pudim tradicional com calda.",
      details: "Ingredientes: leite condensado, ovos e leite. Bata tudo no liquidificador, faça a calda caramelizada e asse em banho-maria por 1 hora."
    },
    { 
      id: 3, 
      name: "Lasanha", 
      category: "Massas",
      description: "Lasanha à bolonhesa.",
      details: "Ingredientes: massa para lasanha, carne moída, molho de tomate e queijo. Monte em camadas e leve ao forno por 40 minutos."
    },
    { 
      id: 4, 
      name: "Macarronada", 
      category: "Massas",
      description: "Macarrão ao molho branco.",
      details: "Ingredientes: macarrão, creme de leite, manteiga e queijo. Cozinhe o macarrão e misture o molho por cima."
    },
    { 
      id: 5, 
      name: "Bife Acebolado", 
      category: "Carnes",
      description: "Carne bovina acebolada.",
      details: "Tempere os bifes, frite em óleo quente e depois adicione cebolas fatiadas até dourar."
    },
    { 
      id: 6, 
      name: "Frango Grelhado", 
      category: "Carnes",
      description: "Peito de frango grelhado.",
      details: "Tempere o frango com sal, limão e alho. Grelhe até dourar os dois lados."
    },
    { 
      id: 7, 
      name: "Salada", 
      category: "Saladas",
      description: "Alface, tomate e cebola.",
      details: "Higienize os vegetais, pique tudo e sirva com azeite, limão e sal."
    },
    { 
      id: 8, 
      name: "Salada Caesar", 
      category: "Saladas",
      description: "Salada com molho caesar.",
      details: "Misture alface americana, frango, croutons e molho Caesar. Finalize com parmesão ralado."
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // FILTRAR RECEITAS POR CATEGORIA
  const filteredRecipes =
    selectedCategory === "Todas"
      ? allRecipes
      : allRecipes.filter((r) => r.category === selectedCategory);

  // PAGINAÇÃO
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div className="app-container">

      <main className="content">
        <h1>Receitas</h1>
        <p>Veja as receitas e suas categorias.</p>

        <h2>Categorias</h2>
        <CategoriesGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
        />

        <h2>
          {selectedCategory === "Todas"
            ? "Todas as Receitas"
            : `Receitas de ${selectedCategory}`}
        </h2>

        <RecipesGrid
          recipes={pageRecipes}
          onRecipeClick={(recipe) => setSelectedRecipe(recipe)}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
