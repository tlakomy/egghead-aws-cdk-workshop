const { DynamoDB } = require("aws-sdk");

exports.handler = async function(event: Record<string, any>) {
  const dynamo = new DynamoDB();

  const scanResult = await dynamo
    .scan({
      "TableName": process.env.TABLE_NAME,
      "Limit": 10
    })
    .promise();

  const response = scanResult.Items.map(DynamoDB.Converter.unmarshall);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(response, null, 2)
  };
};
