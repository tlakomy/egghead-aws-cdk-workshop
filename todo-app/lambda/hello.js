exports.handler = async function(event) {
  console.log("request:", JSON.stringify(event, null, 2));
  console.log("process.env.isProduction", process.env.isProduction);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, egghead friends! You've hit ${event.path}\n`
  };
};
