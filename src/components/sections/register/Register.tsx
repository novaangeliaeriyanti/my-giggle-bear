import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import { loyaltyData } from "@/data/auth";

const Register = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center container mx-auto p-4 lg:py-6">
      <div className="relative w-full bg-blue-sky card-rounded bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-[length:720px] overflow-visible flex items-center justify-center p-4 lg:py-6">
        <h3 className="text-heading-1 text-stroke-3 text-secondary">Register</h3>
      </div>
      <div className="w-full flex flex-col gap-4 lg:flex-row">
        <div className="lg:w-7/12 space-y-3">
          <div className="flex items-center">
            <div className="w-12 h-12">
              <Image
                src="/images/icons/film.png"
                alt="Voucher Icon"
                width={112}
                height={112}
                className="object-contain animate-float"
              />
            </div>
            <div className="flex items-center">
              <h2 className="text-secondary">JOIN</h2>
              <h2 className="text-primary space-xs">US</h2>
            </div>
          </div>
          <div className=" border-1 border-outlined p-8 card-rounded flex flex-col gap-8">
            <RegisterForm />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <h2 className="text-secondary">{loyaltyData.title.main}</h2>
              <h2 className="text-primary space-xs">{loyaltyData.title.highlight}</h2>
            </div>
            <p className="text-body">{loyaltyData.description}</p>
            <div
              className="
                    flex-1 min-w-[500px]
                    bg-[url('/images/icons/cloud.png')]
                    bg-no-repeat bg-center bg-contain
                    aspect-[1/1]
                    flex flex-col items-center justify-center
                    text-pink-400 font-bold
                    -translate-y-20
                  "
            >
              <ul className="space-y-3 text-left text-small">
                {loyaltyData.perks.map((perk) => (
                  <li key={perk.id} className="flex items-center gap-3">
                    <Image
                      src={perk.icon}
                      alt="perk icon"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span className="text-secondary text-heading-1 text-store">{perk.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
