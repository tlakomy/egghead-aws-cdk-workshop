import React from "react";

import "./App.css";

const App: React.FC = () => {
  const inputElement = React.useRef<HTMLInputElement>(null);
  const [todos, setTodos] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setTodos(["Do the thing", "Do the thing", "Do the thing"]);
  }, []);

  const renderTodos = () => todos.map(todo => <li>{todo}</li>);
  const addTodo = (todo: string) => setTodos([...todos, todo]);

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
        {todos.length > 0 ? (
          <ul className="cdk-todo--list">{renderTodos()}</ul>
        ) : (
          <span>No todos added yet</span>
        )}
      </div>
    </div>
  );
};

export default App;
