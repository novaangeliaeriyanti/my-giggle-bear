"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin: SubmitHandler<LoginFormInputs> = async () => {
    alert("Login successful! Check console for data");
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white card-rounded"
      onSubmit={handleSubmit(handleLogin)}
    >
      <FormInput
        id="email"
        label="Email Address"
        placeholder="john@example.com"
        {...register("email")}
        error={errors.email?.message}
        required
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••"
        {...register("password")}
        error={errors.password?.message}
        required
      />

      <Button type="submit" desc="Login" className="flex justify-center items-center" />
    </form>
  );
};

export default LoginForm;
