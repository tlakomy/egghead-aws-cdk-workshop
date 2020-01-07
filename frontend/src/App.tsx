import React from "react";
import uuid from "uuid";

import "./App.css";

type TodoObject = {
  todo: string;
  id: string;
};

const apiEndpoint = process.env.REACT_APP_TODO_ENDPOINT;

const App: React.FC = () => {
  const inputElement = React.useRef<HTMLInputElement>(null);
  const [todos, setTodos] = React.useState<Array<TodoObject> | null>(null);

  React.useEffect(() => {
    (async () => {
      if (apiEndpoint) {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log(data);

        setTodos(data);
      }
    })();
  }, []);

  const renderTodos = () => {
    return todos && todos.length > 0 ? (
      <ul className="cdk-todo--list">
        {todos.map(({ id, todo }) => (
          <li key={id}>{todo}</li>
        ))}
      </ul>
    ) : (
      <span>No todos yet</span>
    );
  };

  const addTodo = (todo: string) =>
    todos && setTodos([...todos, { todo, id: uuid() }]);

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
