const { DynamoDB } = require("aws-sdk");
const uuid = require("uuid");

const createResponse = (body: string, statusCode = 200) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
        },
        body: JSON.stringify(body, null, 2)
    };
};
const tableName = process.env.TABLE_NAME;
const dynamo = new DynamoDB();

const getAlllTodos = async () => {
    const scanResult = await dynamo
        .scan({
            "TableName": tableName,
            "Limit": 10
        })
        .promise();

    return scanResult.Items.map(DynamoDB.Converter.unmarshall);
};

const addTodoItem = async (data: { todo: string; id: string }) => {
    const { id, todo } = data;
    if (todo && todo !== "") {
        await dynamo
            .putItem({
                "TableName": tableName,
                "Item": {
                    id: { S: id || uuid() },
                    todo: { S: todo }
                }
            })
            .promise();
    }
    return todo;
};

const deleteTodoItem = async (data: { id: string }) => {
    const { id } = data;
    if (id && id !== "") {
        await dynamo
            .deleteItem({
                "TableName": tableName,
                "Key": {
                    id: { S: id }
                }
            })
            .promise();
    }

    return id;
};

exports.handler = async function(event: AWSLambda.APIGatewayEvent) {
    try {
        const { httpMethod, body: requestBody } = event;

        if (httpMethod === "GET") {
            const response = await getAlllTodos();

            return createResponse(response);
        }

        if (!requestBody) {
            return createResponse("Missing request body", 400);
        }

        const data = JSON.parse(requestBody);

        if (httpMethod === "POST") {
            const todo = await addTodoItem(data);
            return todo
                ? createResponse(`${todo} added to the database`)
                : createResponse("Todo is missing", 400);
        }

        if (httpMethod === "DELETE") {
            const id = await deleteTodoItem(data);
            return id
                ? createResponse(
                      `Todo item with an id of ${id} deleted from the database`
                  )
                : createResponse("ID is missing", 400);
        }

        return createResponse(
            `We only accept GET, POST, and DELETE, not ${httpMethod}`,
            400
        );
    } catch (error) {
        return createResponse(error, 400);
    }
};
