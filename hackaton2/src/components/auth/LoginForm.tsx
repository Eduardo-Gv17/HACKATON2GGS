// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  onSuccess?: () => void;
}

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Credenciales inválidas o error de servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Input
        label="Correo electrónico"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
};

export default LoginForm;
