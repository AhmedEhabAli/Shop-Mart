import LoginForm from "@/components/LoginFrom/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen pt-20">
      <LoginForm />
      <h2>
        Don't have an account?
        <Link
          href={"/registerform"}
          className="font-semibold hover:underline ml-2"
        >
          Register now
        </Link>
      </h2>
    </div>
  );
}
