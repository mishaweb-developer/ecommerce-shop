import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { supabase } from "../config/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }
    navigate("/");
  }

  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Login" }]} />
      <div className="mx-auto max-w-lg">
        <h1 className="display-text text-center">Login</h1>
        <p className="body-small mx-auto mb-8 mt-3 max-w-2xl text-center text-muted-foreground">
          Sign in to your account to continue shopping and access your orders.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            id="login-email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="login-password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div aria-live="polite" className="min-h-5 text-sm text-accent">
            {error}
          </div>
          <Button type="submit" size="large" className="w-full">
            Login
          </Button>
        </form>
        <p className="body-small mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
