import { Nav } from "./Nav";

interface HeaderProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ showSidebar, toggleSidebar }: HeaderProps) => {
  return (
    <header role="banner">
      <Nav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </header>
  );
};
