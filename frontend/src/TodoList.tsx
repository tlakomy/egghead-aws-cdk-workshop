import React from "react";
import styled from "@emotion/styled";

export type TodoObject = {
    todo: string;
    id?: string;
};

type Props = {
    todos: Array<TodoObject>;
    deleteTodo: (id?: string) => void;
};

const List = styled.ul`
    width: 80%;
    margin-top: 3.6rem;
`;

const ListItem = styled.li`
    display: flex;
    padding: 1.4rem 0;
    font-size: 2rem;
    border-bottom: 1px solid #d8dfe0;

    span {
        width: 100%;
    }

    button {
        color: #002f34;
        font-weight: 700;
        margin-left: 16px;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        background-color: #fff;
        font-size: 1.4rem;
    }
`;

const Message = styled.span`
    font-size: 2rem;
`;

const TodoList = ({ todos, deleteTodo }: Props) => {
    return todos.length > 0 ? (
        <List>
            {todos.map(({ id, todo }) => (
                <ListItem key={id}>
                    <span>{todo}</span>
                    <button onClick={() => deleteTodo(id)}>delete</button>
                </ListItem>
            ))}
        </List>
    ) : (
        <Message>No todos yet :(</Message>
    );
};

export default TodoList;
