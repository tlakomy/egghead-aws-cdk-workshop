const { DynamoDB } = require("aws-sdk");

exports.handler = async function(event) {
  console.log("request", JSON.stringify(event, null, 2));

  // Create AWS SDK client:
  const dynamo = new DynamoDB();

  const params = {
    TableName: process.env.HITS_TABLE_NAME,
    Item: {
      path: { S: "1" }
    }
  };

  const result = await ssdynamo.putItem(params).promise();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(result, null, 2)
  };
};
