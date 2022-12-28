import { Routes } from "config/routes";
import Link from "next/link";

export const UserMenu = () => {
  return (
    <ul role="menu" aria-label="User navigation menu">
      <li role="none">
        <Link role="menuitem" href={Routes.login}>
          Log In
        </Link>
      </li>
      <li role="none">
        <Link role="menuitem" href={Routes.signup}>
          Sign Up
        </Link>
      </li>
    </ul>
  );
};
