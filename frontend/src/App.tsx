import Footer from "./components/layout/Footer";
import GridBackground from "./components/layout/GridBackground";
import Hearder from "./components/layout/Header";
import Routes from "./routes";

const App = () => {
  return (
    <GridBackground>
      {/* App header */}
      <Hearder />

      {/* App content */}
      <Routes />

      {/* Footer */}
      <Footer />
    </GridBackground>
  );
};

export default App;
