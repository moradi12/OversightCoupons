import { MainRoute } from "../../Pages/Route/MainRoute";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
export function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <div>
        <Menu />
      </div>
      <main>
        <MainRoute />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
