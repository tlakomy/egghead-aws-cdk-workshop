const { DynamoDB } = require("aws-sdk");

exports.handler = async function(event) {
  const dynamo = new DynamoDB();
  const { queryStringParameters } = event;
  let response = "OK";
  let statusCode = 200;
  console.log(queryStringParameters);

  try {
    if (queryStringParameters.todo) {
      console.log("Putting a new item into DynamoDB");
      await dynamo
        .putItem({
          "TableName": process.env.TODOS_TABLE_NAME,
          "Item": {
            todo: { S: queryStringParameters.todo }
          }
        })
        .promise();
    } else {
      console.log("Scanning all items from the DB");
      const scanResult = await dynamo
        .scan({
          "TableName": process.env.TODOS_TABLE_NAME,
          "Limit": 10
        })
        .promise();
      response = scanResult.Items;
    }
  } catch (error) {
    console.log(error);
    response = error;
    statusCode = 500;
  }

  return {
    statusCode,
    headers: { "Content-Type": "text/plain" },
    body: response
  };
};
