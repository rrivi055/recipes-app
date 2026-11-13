import { useId, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";

/*
  שאלה: האם אפשר לבדוק תקינות בזמן הקלדה, או רק בשליחת הטופס?
  תשובה: רק בשליחת הטופס, בתוך הפונקציה של action.
  בטופס לא מבוקר הערכים לא נשמרים ב-state, ולכן React לא יודע מה המשתמש מקליד
  עד שהטופס נשלח. בדיקה בזמן הקלדה דורשת טופס מבוקר (או react-hook-form).
*/

export default function UncontrolledLogin() {
  const id = useId();
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "chef@recipes.com", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleLogin = (formData) => {
    const data = Object.fromEntries(formData);

    // שומרים את מה שהוקלד, כי אחרי שליחה React מאפס את הטופס לערכי ה-defaultValue
    setValues(data);

    const newErrors = {};
    if (!data.email) {
      newErrors.email = "אימייל הוא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "כתובת האימייל אינה תקינה";
    }
    if (!data.password) {
      newErrors.password = "סיסמה היא שדה חובה";
    } else if (data.password.length < 6) {
      newErrors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }

    setErrors(newErrors);
    setGeneralError("");
    if (Object.keys(newErrors).length > 0) return;

    const user = login(data);
    if (!user) {
      setGeneralError("אימייל או סיסמה שגויים");
      return;
    }
    navigate("/recipes");
  };

  return (
    <div>
      <h2>טופס לא מבוקר</h2>
      <form action={handleLogin} noValidate>
        <div>
          <label htmlFor={`${id}-email`}>אימייל</label>
          <input id={`${id}-email`} name="email" type="email" defaultValue={values.email} />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-password`}>סיסמה</label>
          <input id={`${id}-password`} name="password" type="password" defaultValue={values.password} />
          {errors.password && <p>{errors.password}</p>}
        </div>

        {generalError && <p>{generalError}</p>}
        <button type="submit">התחברות</button>
      </form>
    </div>
  );
}