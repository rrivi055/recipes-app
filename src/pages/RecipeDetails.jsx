import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("המתכון לא נמצא");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const goRandom = () => {
    const randomId = Math.floor(Math.random() * 50) + 1;
    navigate(`/recipes/${randomId}`);
  };

  if (loading) {
    return <p>טוען...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <p>
        <Link to="/recipes">חזרה לרשימה </Link>
      </p>

      <div>
        <button onClick={() => navigate(-1)}>חזרה</button>
        <button onClick={goRandom}>מתכון אקראי</button>
      </div>

      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <p>
            זמן הכנה: {recipe.prepTimeMinutes} דקות | זמן בישול: {recipe.cookTimeMinutes} דקות | 
            מנות: {recipe.servings} | רמת קושי: {recipe.difficulty}
          </p>
          <img src={recipe.image} alt={recipe.name} width="300" />
          
          <h3>מצרכים</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3>הוראות הכנה</h3>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <div style={{ marginTop: "20px" }}>
            <Link to={`/recipes/${Number(id) + 1}`}>למתכון הבא</Link>
          </div>
        </>
      )}
    </div>
  );
}