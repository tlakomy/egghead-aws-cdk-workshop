const { DynamoDB } = require("aws-sdk");

const createResponse = (body: string, statusCode = 200) => {
  return {
    statusCode,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(body, null, 2)
  };
};

exports.handler = async function(event: AWSLambda.APIGatewayEvent) {
  try {
    const dynamo = new DynamoDB();
    const { queryStringParameters, httpMethod } = event;
    const tableName = process.env.TABLE_NAME;

    if (httpMethod === "GET") {
      const scanResult = await dynamo
        .scan({
          "TableName": tableName,
          "Limit": 10
        })
        .promise();

      const response = scanResult.Items.map(DynamoDB.Converter.unmarshall);

      return createResponse(response);
    }

    if (httpMethod === "POST") {
      if (queryStringParameters && queryStringParameters.todo) {
        const { todo } = queryStringParameters;
        await dynamo
          .putItem({
            "TableName": tableName,
            "Item": {
              id: { S: "random_id" },
              todo: { S: todo }
            }
          })
          .promise();

        return createResponse(`${todo} added to the database`);
      }
      return createResponse("Todo is missing", 400);
    }

    return createResponse(
      `We only accept GET, POST, and DELETE, not ${httpMethod}`,
      400
    );
  } catch (error) {
    return createResponse(error, 400);
  }
};
