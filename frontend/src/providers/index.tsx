import { BrowserRouter } from "react-router-dom";

export type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <>{children}</>
    </BrowserRouter>
  );
};
