import { Routes } from "config/routes";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <h2>Log In</h2>
      <Link href={Routes.signup}>Sign Up</Link>
      <br />
      <Link href={Routes.home}>Home</Link>
    </div>
  );
};

export default Login;
