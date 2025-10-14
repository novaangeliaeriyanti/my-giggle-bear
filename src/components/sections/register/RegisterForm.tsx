"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInputs, registerFormSchema } from "@/types/types";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
  });

  const hasKid = watch("hasKid", "No");

  const handleRegister: SubmitHandler<RegisterFormInputs> = async (data) => {
    alert("Registration successful! Check console for data");
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white card-rounded"
      onSubmit={handleSubmit(handleRegister)}
    >
      <FormInput
        id="name"
        label="Full Name"
        placeholder="John Doe"
        {...register("name")}
        error={errors.name?.message}
        required
      />

      <FormInput
        id="email"
        label="Email Address"
        placeholder="john@example.com"
        {...register("email")}
        error={errors.email?.message}
        required
      />

      <FormInput
        id="phone"
        label="Phone Number"
        placeholder="+628123456789"
        {...register("phone")}
        error={errors.phone?.message}
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

      <FormInput
        id="dateOfBirth"
        label="Date of Birth"
        type="date"
        {...register("dateOfBirth")}
        error={errors.dateOfBirth?.message}
        required
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="hasKid" className="text-small">
          Do you have a kid?
        </label>
        <select
          id="hasKid"
          {...register("hasKid")}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-sm bg-white"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {errors.hasKid && <p className="text-xs text-red-500 mt-1">{errors.hasKid.message}</p>}
      </div>

      {hasKid === "Yes" && (
        <div className="flex flex-col gap-1">
          <label htmlFor="kidAge" className="text-small">
            How old is your kid?
          </label>
          <select
            id="kidAge"
            {...register("kidAge")}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-small bg-white"
          >
            <option value="">Select age</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i + 1 === 1 ? "year old" : "years old"}
              </option>
            ))}
          </select>
          {errors.kidAge && <p className="text-xs text-red-500 mt-1">{errors.kidAge.message}</p>}
        </div>
      )}

      <Button type="submit" desc="Submit" className="flex justify-center items-center" />
    </form>
  );
};

export default RegisterForm;
