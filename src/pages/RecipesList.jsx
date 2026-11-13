import { Link, useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const searchRef = useRef(null)
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("q") || "";
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchParams({ q: value }, { replace: true })
    }
    const handleSurprise = () => {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        navigate(`/recipes/${randomRecipe.id}`);
    }
    useEffect(()=>{
        searchRef.current.focus();
    },[])
    useEffect(() => {
        const conectDb = async () => {
            try {
                const { data } = await axios.get("https://dummyjson.com/recipes");
                setRecipes(data.recipes);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }
        conectDb();
    }, [])
    const lowerSearch = search.toLowerCase();
    const filtered = recipes.filter(r => r.name.toLowerCase().includes(lowerSearch));
    return <div>
        <h1>מתכונים</h1>
        {(loading || error) && <p>{loading ? "...טוען" : error}</p>}
        <input type="text" value={search} ref={searchRef} placeholder="חיפוש מתכון (באנגלית)" onChange={handleSearch}/>
        <button onClick={handleSurprise} disabled={loading || recipes.length === 0}>הפתיעי אותי</button>
        <ul>
            {filtered.map(r => <li key={r.id}><Link to={`/recipes/${r.id}`}>{r.name}</Link></li>)}
        </ul>
        {!(loading || error || filtered.length!=0)&&<p>לא נמצאו מתכונים</p>}
    </div >
}
export default RecipesList;