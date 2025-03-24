import { useEffect, useState } from "react";
import { PrettyObject } from "./components/custom/PrettyObject";

function App() {
  type User = {
    id: string;
    name: string;
    age: string;
    email: string;
  };

  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8080/users", {
        method: "GET",
      });
      const data: User[] = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <p className="font-bold">Hello world!</p>
      <PrettyObject>{users}</PrettyObject>
    </div>
  );
}

export default App;
