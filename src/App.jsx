import Menus from "./components/Menus";
import MainRoute from "./route";

export default function App() {
  return (
    <div className="flex h-screen">
      <Menus />
      <div className="px-8 flex-1">
        <MainRoute />
      </div>
    </div>
  );
}
