import { useAppContext } from "../context/app.provider";

const UserPage = () => {
  const { theme, setTheme } = useAppContext();
  return (
    <div>
      <h1>UserPage them = {theme}</h1>
    </div>
  );
};

export default UserPage;
