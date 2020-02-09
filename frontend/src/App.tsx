import React from "react";
import styled from "@emotion/styled";
import uuid from "uuid";

type TodoObject = {
    todo: string;
    id: string;
};

const apiEndpoint = process.env.REACT_APP_TODO_ENDPOINT;

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 600px;
    max-width: 80vw;
    min-height: 600px;
    border-radius: 4px;
    border: solid 1px #d8dfe0;
    background: #fff;
`;

const Header = styled.header`
    width: 100%;
    background: #002f34;
    color: #fff;
    text-align: center;
    font-size: 36px;
    padding: 24px 0;
`;

const NewTodoSection = styled.section`
    margin: 24px 0;
    display: flex;
    flex-direction: column;
`;

const TodoInputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 8px;
    label: {
        font-size: 24px;
    }

    input {
        font-size: 20px;
        min-width: 50%;
        margin-right: 8px;
        padding: 8px;
    }

    button {
        font-weight: 700;
        font-size: 16px;
        color: white;
        border-radius: 4px;
        background-color: #002f34;
        padding: 12px 14px;
    }
`;

const TodoList = styled.ul`
    width: 80%;
    margin-top: 36px;
`;

const ListItem = styled.li`
    display: flex;
    margin-top: 8px;
    font-size: 20px;

    span {
        width: 100%;
    }

    button {
        color: #002f34;
        font-weight: 700;
        margin-left: 16px;
        padding: 4px;
        border-radius: 4px;
        background-color: #fff;
        font-size: 14px;
    }
`;

const App = () => {
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
            <TodoList>
                {todos.map(({ id, todo }) => (
                    <ListItem key={id}>
                        <span>{todo}</span>
                        <button>delete</button>
                    </ListItem>
                ))}
            </TodoList>
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
        <Wrapper>
            <Header>
                <h1>Amazon CDK Todo App</h1>
            </Header>
            <NewTodoSection>
                <label htmlFor="add-todo">Add a new todo</label>
                <TodoInputContainer>
                    <input
                        id="#add-todo"
                        type="text"
                        ref={inputElement}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleClick}>Add todo</button>
                </TodoInputContainer>
            </NewTodoSection>
            {todos === null ? <span>Loading ...</span> : renderTodos()}
        </Wrapper>
    );
};

export default App;
