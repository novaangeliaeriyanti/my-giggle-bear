"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormInputs, paymentFormSchema } from "@/types/types";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";

type PaymentFormProps = {
  onStatusChange: (status: "pending" | "success" | "error") => void;
};

const PaymentForm = ({ onStatusChange }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = async () => {
    onStatusChange("pending");

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        onStatusChange("success");
      } else {
        onStatusChange("error");
      }
    }, 2000);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handlePaymentForm)}>
      <FormInput
        id="cardHolder"
        label="Name on card"
        placeholder="John Doe"
        {...register("cardHolder")}
        error={errors.cardHolder?.message}
        required
      />
      <FormInput
        id="cardNumber"
        label="Card Number"
        placeholder="123456789123"
        {...register("cardNumber")}
        error={errors.cardNumber?.message}
        required
      />
      <FormInput
        id="expirationDate"
        label="Expiration Date"
        placeholder="01/32"
        {...register("expirationDate")}
        error={errors.expirationDate?.message}
        required
      />
      <FormInput
        id="cvv"
        label="CVV"
        placeholder="123"
        {...register("cvv")}
        error={errors.cvv?.message}
        required
      />

      <Button
        type="submit"
        desc="Place Order"
        icon={<ShoppingCart className="w-3 h-3" />}
        className="flex justify-center items-center"
      />
    </form>
  );
};

export default PaymentForm;
