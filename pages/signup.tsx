import { Routes } from "config/routes";
import Link from "next/link";

const Signup = () => {
  return (
    <div>
      <h2>Log In</h2>
      <Link href={Routes.login}>Log In</Link>
      <Link href={Routes.home}>Home</Link>
    </div>
  );
};

export default Signup;
