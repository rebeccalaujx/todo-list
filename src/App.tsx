import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/PageItems/TodoList";
import { Flex, Spin } from "antd";

export interface InputDataType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [data, setData] = useState<InputDataType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (!data) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }

  return <TodoList data={data} />;
};

export default App;
