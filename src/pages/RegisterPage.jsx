import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { supabase } from "../config/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess("Account created successfully.");
    navigate("/login");
  }
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Register" }]} />
      <div className="mx-auto max-w-lg">
        <h1 className="display-text mb-8">Register</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            id="full-name"
            name="fullName"
            label="Full Name"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            id="register-email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="register-password"
            name="password"
            type="password"
            label="Password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div aria-live="polite" className="min-h-5 text-sm text-accent">
            {error}
          </div>

          <div aria-live="polite" className="min-h-5 text-sm text-green-700">
            {success}
          </div>
          <Button type="submit" size="large" className="w-full">
            Register
          </Button>
        </form>
        <p className="body-small mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
