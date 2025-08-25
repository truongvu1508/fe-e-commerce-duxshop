import { useAppContext } from "../context/app.provider";

const HomePage = () => {
  const { theme, setTheme } = useAppContext();
  return (
    <div>
      <h1>HomePage them = {theme}</h1>
      <div>
        <button onClick={() => setTheme("dark")}>Change to dark</button>
        <button onClick={() => setTheme("light")}>Change to light</button>
      </div>
    </div>
  );
};

export default HomePage;
