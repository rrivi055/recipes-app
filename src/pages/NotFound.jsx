import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>העמוד לא נמצא</h1>
      <p>בעוד 5 שניות תועברי לעמוד הבית.</p>
      <Link to="/">לעבור עכשיו</Link>
    </div>
  );
}