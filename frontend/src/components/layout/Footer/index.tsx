import { Link } from "react-router-dom";
import { FlipWords } from "../../app/FlipWords";

const Footer = () => {
  const words = ["better", "faster", "beautiful", "modern"];

  return (
    <div>
      <div className="w-100 h-[10rem] flex justify-center items-center px-4">
        <Link
          to={
            "https://github.com/GuilhermeVozniak/GraphQL-monorepo-finance-app"
          }
          target="_blank"
          className="text-neutral-100 dark:text-neutral-100"
        >
          <div className="text-2xl mx-auto font-normal text-neutral-100 dark:text-neutral-400">
            Build
            <FlipWords words={words} />
            Applications
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
