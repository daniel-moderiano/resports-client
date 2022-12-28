import { Routes } from "config/routes";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <Link href={Routes.signup}>Sign Up</Link>
      <Link href={Routes.home}>Home</Link>
    </div>
  );
};

export default Login;
