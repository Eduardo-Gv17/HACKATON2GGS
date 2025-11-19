// src/components/auth/RegisterForm.tsx
import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<Props> = ({ onSuccess }) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(name, email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("No se pudo crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Input
        label="Nombre completo"
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />

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
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
};

export default RegisterForm;
