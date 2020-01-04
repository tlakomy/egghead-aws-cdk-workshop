import React from "react";

import "./App.css";

type TodoObject = {
  todo: string;
};

const App: React.FC = () => {
  const inputElement = React.useRef<HTMLInputElement>(null);
  const [todos, setTodos] = React.useState<Array<string> | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://lo8b4qsdk1.execute-api.us-east-1.amazonaws.com/prod/"
      );
      const data = await response.json();

      const newTodos = data.map((item: TodoObject) =>
        Object.values(item.todo).join()
      );
      setTodos(newTodos);
    })();
  }, []);

  const renderTodos = () => {
    return todos && todos.length > 0 ? (
      <ul className="cdk-todo--list">
        {todos.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    ) : (
      <span>No todos yet</span>
    );
  };

  const addTodo = (todo: string) => todos && setTodos([...todos, todo]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const value = inputElement?.current?.value;
    if (event.key === "Enter" && value) {
      addTodo(value);
    }
  };

  const handleClick = () => {
    const value = inputElement?.current?.value;
    if (value) {
      addTodo(value);
    }
  };

  return (
    <div className="cdk-todo">
      <header className="cdk-todo--header">
        <h1>Amazon CDK Todo App</h1>
      </header>
      <label>
        Add a new todo
        <input type="text" ref={inputElement} onKeyPress={handleKeyPress} />
        <button onClick={handleClick}>Add</button>
      </label>
      <div className="cdk-todo--list-container">
        {todos === null ? <span>Loading ...</span> : renderTodos()}
      </div>
    </div>
  );
};

export default App;
