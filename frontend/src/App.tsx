import React from "react";
import styled from "@emotion/styled";
import uuid from "uuid";

import ErrorMessage from "./ErrorMessage";
import TodoList, { TodoObject } from "./TodoList";

const apiEndpoint = process.env.REACT_APP_TODO_ENDPOINT;

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 50rem;
    max-width: 80vw;
    min-height: 60rem;
    border-radius: 4px;
    border: solid 1px #d8dfe0;
    background: #fff;
`;

const Logo = styled.img`
    position: absolute;
    bottom: 16px;
    width: 200px;
`;

const Header = styled.header`
    width: 100%;
    background: #002f34;
    color: #fff;
    text-align: center;
    font-size: 3.6rem;
    padding: 2.4rem 0;
`;

const NewTodoSection = styled.section`
    margin: 2.4rem;
    display: flex;
    flex-direction: column;
    label {
        font-size: 1.4rem;
    }
`;

const TodoInputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.8rem;

    input {
        font-size: 2rem;
        min-width: 50%;
        margin-right: 0.8rem;
        padding: 0.8rem;
    }

    button {
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        color: white;
        border-radius: 4px;
        background-color: #002f34;
        padding: 1.2rem 1.4rem;
    }
`;

const LoadingText = styled.span`
    font-size: 1.6rem;
`;

const App = () => {
    const inputElement = React.useRef<HTMLInputElement>(null);
    const [todos, setTodos] = React.useState<Array<TodoObject>>([]);
    const [isLoading, setLoading] = React.useState(true);
    const [isError, setError] = React.useState(!apiEndpoint);

    React.useEffect(() => {
        (async () => {
            if (apiEndpoint) {
                try {
                    const response = await fetch(apiEndpoint);
                    if (!response.ok) {
                        setError(true);
                        return;
                    }
                    const data = await response.json();

                    setTodos(data);
                    setLoading(false);
                } catch {
                    setError(true);
                }
            }
        })();
    }, []);

    if (isError) {
        return <ErrorMessage />;
    }

    const addTodo = (todo: string) => {
        const newTodo = { todo, id: uuid() };
        setTodos([...todos, newTodo]);
        if (!apiEndpoint) return;
        fetch(apiEndpoint, {
            method: "POST",
            body: JSON.stringify(newTodo)
        });

        if (inputElement.current) {
            inputElement.current.value = "";
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        const value = inputElement?.current?.value;
        if (event.key === "Enter" && value) {
            addTodo(value);
        }
    };

    const addTodoClick = () => {
        const value = inputElement?.current?.value;
        if (value) {
            addTodo(value);
        }
    };

    const deleteTodo = (id?: string) => {
        if (id) {
            if (!apiEndpoint) return;
            fetch(apiEndpoint, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    return (
        <Wrapper>
            <Header>
                <h1>Amazon CDK Todo App</h1>
            </Header>
            <NewTodoSection>
                <label htmlFor="add-todo">Add a new todo</label>
                <TodoInputContainer>
                    <input
                        id="add-todo"
                        type="text"
                        ref={inputElement}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={addTodoClick}>Add todo</button>
                </TodoInputContainer>
            </NewTodoSection>
            {isLoading ? (
                <LoadingText>Loading ...</LoadingText>
            ) : (
                <TodoList todos={todos} deleteTodo={deleteTodo} />
            )}
            <Logo src="" alt="Egghead logo" />
        </Wrapper>
    );
};

export default App;
