// import TravelRegister from "@/assets/images/Mask group (1).png"

import { RegisterForm } from "@/components/Modules/Authentication/RegisterForm";

export default function Register() {
  return (
    <div className="grid min-h-svh ">
      {/* <div className="relative hidden bg-muted lg:block">
        <img
          src={TravelRegister}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div> */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div> */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}