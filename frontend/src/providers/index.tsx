import { BrowserRouter } from "react-router-dom";
import GridBackground from "../components/GridBackground";

export type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <GridBackground>{children}</GridBackground>
    </BrowserRouter>
  );
};
