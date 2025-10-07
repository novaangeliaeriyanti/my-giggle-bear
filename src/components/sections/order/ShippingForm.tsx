"use client"

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import { ShippingFormInputs, shippingFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/order?step=3", { scroll: false });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleShippingForm)}>
      <div className="flex flex-col gap-1">
        <FormInput
          id="name"
          label="Name"
          placeholder="John Doe"
          {...register("name")}
          error={errors.name?.message}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <FormInput
          id="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
          error={errors.email?.message}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <FormInput
          id="phone"
          label="Phone"
          placeholder="123456789"
          {...register("phone")}
          error={errors.phone?.message}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <FormInput
          id="address"
          label="Address"
          placeholder="123 Main St, Anytown"
          {...register("address")}
          error={errors.address?.message}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <FormInput
          id="city"
          label="City"
          placeholder="New York"
          {...register("city")}
          error={errors.city?.message}
          required
        />
      </div>
      <Button
        type="submit"
        desc="Proceed to Payment"
        icon={<ArrowRight className="w-3 h-3" />}
        className="flex justify-center items-center"
      />
    </form>
  );
};

export default ShippingForm;
