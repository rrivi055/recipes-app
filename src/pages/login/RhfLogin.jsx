import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";
import { loginSchema } from "../../utils/schema";

export default function RhfLogin() {
  const id = useId();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "chef@recipes.com", password: "" },
  });

  const onSubmit = (data) => {
    setGeneralError("");
    const user = login(data);
    if (!user) {
      setGeneralError("אימייל או סיסמה שגויים");
      return;
    }
    navigate("/recipes");
  };

  return (
    <div>
      <h2>טופס react-hook-form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor={`${id}-email`}>אימייל</label>
          <input id={`${id}-email`} type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-password`}>סיסמה</label>
          <input id={`${id}-password`} type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {generalError && <p>{generalError}</p>}
        <button type="submit">התחברות</button>
      </form>
    </div>
  );
}