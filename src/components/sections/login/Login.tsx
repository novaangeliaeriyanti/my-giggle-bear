import React from "react";
import Image from "next/image";
import { loyaltyLoginData } from "@/data/auth";
import LoginForm from "./LoginForm";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { UserRoundPlus } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";

const Login = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 items-center justify-center container mx-auto p-4 lg:py-6">
      <PageTitle title="Login" />
      <div className="w-full flex flex-col gap-4 lg:flex-row">
        <div className="lg:w-7/12 space-y-3">
          <div className="flex items-center">
            <div className="w-12 h-12">
              <Image
                src="/images/icons/film.png"
                alt="Login Icon"
                width={112}
                height={112}
                className="object-contain animate-float"
              />
            </div>
            <div className="flex items-center">
              <h2 className="text-secondary">WELCOME</h2>
              <h2 className="text-primary space-xs">BACK</h2>
            </div>
          </div>
          <div className="border-1 border-outlined p-8 card-rounded flex flex-col gap-8">
            <LoginForm />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <h2 className="text-secondary">{loyaltyLoginData.title.main}</h2>
              <h2 className="text-primary space-xs">{loyaltyLoginData.title.highlight}</h2>
              <Button
                onClick={() => router.push("/register")}
                desc="Register"
                icon={<UserRoundPlus className="w-4 h-4" />}
                className="flex justify-center items-center w-fit"
              />
            </div>
            <p className="text-body">{loyaltyLoginData.description}</p>
            <div
              className="
                    flex-1 min-w-[150px] lg:min-w-[200px]
                    bg-[url('/images/icons/cloud.png')]
                    bg-no-repeat bg-center bg-contain
                    aspect-[1/1]
                    flex flex-col items-center justify-center
                    text-pink-400 font-bold
                    -translate-y-16
                    gap-3
                  "
            >
              <ul className="text-left text-tiny flex justify-center flex-col px-24 lg:space-y-2">
                {loyaltyLoginData.perks.map((perk) => (
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

export default Login;
