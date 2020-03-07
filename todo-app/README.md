# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`NewTodoAppStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

-   `npm run build` compile typescript to js
-   `npm run watch` watch for changes and compile
-   `npm run test` perform the jest unit tests
-   `cdk deploy` deploy this stack to your default AWS account/region
-   `cdk diff` compare deployed stack with current state
-   `cdk synth` emits the synthesized CloudFormation template

# Egghead AWS CDK Workshop Rough Plan:

## Pre-workshop:

Create an AWS account, install AWS CLI, AWS CDK, AWS SAM (including Docker) and configure your account.

Hide `node_modules`, `**/*.d.ts` and `**/lesson*/**/*.js` files in VSCode using `Exclude` option in Settings

### Note - check the cdk-spa-deploy version before the workshop because if there's a version mismatch it won't work

## Workshop:

## Part 1

-   Verify AWS account and AWS CLI to avoid fuckups later in the workshop (verify `~/.aws/config` and `~/.aws/credentials`
-   Start a new project: `cdk init sample-app --language=typescript`
-   Ignore the frontend folder for now
-   Take a look at the sample app
-   **REMEMBER ABOUT NPM RUN WATCH OR YOU'LL WASTE 30 FREAKING MINUTES DEBUGGING WHY YOUR STACK IS NOT UPDATING**
-   Run `cdk synth` to see the generated CloudFormation template with SNS and SQS inside
-   Deploy the sample project
-   Take a look in CloudFormation at the newly deployed stack
-   Delete all the boilerplate code and run `cdk diff` to see the resources that will be deleted
-   Deploy the stack again
-   Check out CloudFront to see an empty stack
-   Install `npm install --save @types/aws-lambda`
-   Create a new lambda function handler in new `lambda` directory, call it `hello.ts`

```
exports.handler = async function(event: AWSLambda.APIGatewayEvent) {
  console.log("request:", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, egghead friends! You've hit ${event.path}\n`
  };
};

```

-   Install `@aws-cdk/aws-lambda` from npm
-   Create a lambda function in `todo-app-stack` and highlight both mandatory and optional props:

```
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class NewTodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("lambda"),
      handler: "hello.handler"
    });
  }
}
```

-   Run `cdk bootstrap` if necessary
-   Deploy the lambda function and test it using sample events in AWS console

**This concluded the first major part of the workshop**

**What we've learned so far:**

-   What's Amazon CDK
-   Starting a new project
-   Deploying stacks to AWS
-   Reviewing differences between stacks with `cdk diff`
-   Reviewing generated CloudFormation template with `cdk synth`
-   Writing, deploying and testing a lambda function

## Part 2

**How do we modify the properties of our lambda function?**

-   Increase the timeout of a lambda function to 10 seconds and the available memory to 256MB

```
const helloLambda = new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("lambda"),
      handler: "hello.handler",
      timeout: Duration.seconds(10),
      memorySize: 256
    });
```

-   Run cdk diff:

```
▶ cdk diff
Stack NewTodoAppStack
Resources
[~] AWS::Lambda::Function HelloLambda HelloLambda3D9C82D6
 ├─ [+] MemorySize
 │   └─ 256
 └─ [+] Timeout
     └─ 10
```

**How do we use env variables?**

-   Pass in env variables to the lambda function using the `environment` option:

```
const helloLambda = new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("lambda"),
      handler: "hello.handler",
      timeout: Duration.seconds(10),
      memorySize: 256,
      environment: { secret_db_key: "Password1" }
    });
```

and `console.log` it in the lambda function:

`console.log("Secret DB key", process.env.secret_db_key);`

-   Deploy and test the function in AWS Console

**But how do we call this function?**

-   Run `npm install @aws-cdk/aws-apigateway`
-   Add an API Gateway to our stack, so it looks like this:

```
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";

import { Duration } from "@aws-cdk/core";

export class NewTodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("lambda"),
      handler: "hello.handler",
      timeout: Duration.seconds(10),
      memorySize: 256,
      environment: { secret_db_key: "Password1" }
    });

    new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: helloLambda
    });
  }
}
```

**What we've learned in this section:**

-   Modifying the properties of a lambda function
-   Using env variables in lambda functions
-   Attaching API Gateway to a lambda function and creating a REST endpoint

## Part 2.5

**Execute a lambda function locally**

-   Compile your AWS CDK app and create a AWS CloudFormation template
-   First, run `npm run build` to compile the app
-   Run `cdk synth --no-staging > template.yaml` to create a CloudFormation template
-   Find the logical ID for your Lambda function in template.yaml. It will look like `MyFunction12345678`, where 12345678 represents an 8-character unique ID that the AWS CDK generates for all resources. The line right after it should look like:

`Type: AWS::Lambda::Function`

-   Run the function by executing:
    `sam local invoke HelloLambda3D9C82D6`

-   We can also pass custom events to the function, to do that - take a look at `sample_events` directory, there's a sample `hello.json` event in there

-   To execute a lambda function locally with a custom event, execute:

`sam local invoke HelloLambda3D9C82D6 -e sample_events/hello.json`

## Part 3

**Working with S3**

-   Install `@aws-cdk/aws-s3`
-   Start by creating an s3 bucket with default options:

`const logoBucket = new s3.Bucket(this, "LogoBucket", {});`

-   Run `cdk diff`:

```
▶ cdk diff
Stack NewTodoAppStack
Resources
[+] AWS::S3::Bucket LogoBucket LogoBucketEB73FE35
```

-   Make it public:

```
const logoBucket = new s3.Bucket(this, "LogoBucket", {
      publicReadAccess: true
    });
```

-   Deploy it to AWS

**Trigger a lambda function when a file is uploaded to the bucket**

-   Install the s3 notifications package: `npm install @aws-cdk/aws-s3-notifications`
-   Add a notification to an s3 bucket:

```
logoBucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new s3Notifications.LambdaDestination(helloLambda)
    );
```

-   Run `cdk diff` and deploy
-   Verify that an event has been added to a bucket
-   Test the notification by uploading a file to the s3 bucket and checking lambda function logs

**Upload an egghead logo to the s3 bucket from CDK**

-   Install (experimental, yolo): `@aws-cdk/aws-s3-deployment`
-   Add a new s3 deployment:

```
new s3Deployment.BucketDeployment(this, "DeployLogo", {
      destinationBucket: logoBucket,
      retainOnDelete: true, // keep current files
      sources: [s3Deployment.Source.asset("./assets")]
    });
```

-   Verify that the file has been successfully added to S3 and that we're able to access it from the Internet

**What we've learned in this section:**

-   Creating an S3 bucket
-   Making an S3 bucket public
-   Adding an event notification trigger to an S3 bucket to trigger a lambda function
-   Deploy a file to an S3 bucket using `aws-s3-deployment`

## Part 4 - Custom constructs

-   Our stack is growing a bit, if we keep on doing that it'll be difficult to maintain. Create a new file `todo-database.ts` in `lib` directory
-   Create a new construct (`TodoDatabase`) which is going to handle adding/getting todos from a database

```
import * as cdk from "@aws-cdk/core";

export class TodoDatabase extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);
  }
}
```

-   Import and create an instance of the construct in the main stack:
    `const todoDatabase = new TodoDatabase(this, "TodoDatabase");`
-   Notice that `cdk diff` is not showing anything new since this construct is not yet creating any resources
-   Install `@aws-cdk/aws-dynamodb`

-   Create a new DynamoDB table in the construct

```
import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class TodoDatabase extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    new dynamodb.Table(this, "TodoDatabase", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
    });
  }
}
```

-   Run `cdk diff`:

```
▶ cdk diff
Stack NewTodoAppStack
Resources
[+] AWS::DynamoDB::Table TodoDatabase/TodoDatabase TodoDatabase08DB7F4F
```

-   Take a look at the DynamoDB table in AWS Console and add two todo items which look more or less like this:

```
{
  "id": "123",
  "isCompleted": false,
  "todo": "Learn AWS CDK"
}
```

**What we've learned in this section:**

-   Creating a new CDK Construct from scratch and importing it in main stack
-   Creating a DynamoDB table
-   Adding new items to a DynamoDB table

## Part 5 - Creating a DynamoDB table for todos

-   Create a `todoHandler.ts` lambda function that for now is going to list all items from the table:

**REWRITE THIS SECTION**

-   Deploy the `todoHandler.ts` function in the `TodoDatabase` stack

```
import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import dynamodb = require("@aws-cdk/aws-dynamodb");

export class TodoAdder extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const todosTable = new dynamodb.Table(this, "Todos", {
      partitionKey: { name: "todo", type: dynamodb.AttributeType.STRING }
    });

    new lambda.Function(this, "TodoAdderHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "todoAdder-lambda.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        TODOS_TABLE_NAME: todosTable.tableName
      }
    });
  }
}
```

afterwards we need to make the `todoHandler` available for modules importing this class:

```
export class TodoAdder extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const todosTable = new dynamodb.Table(this, "Todos", {
      partitionKey: { name: "todo", type: dynamodb.AttributeType.STRING }
    });

    this.handler = new lambda.Function(this, "TodoAdderHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "todoAdder-lambda.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        TODOS_TABLE_NAME: todosTable.tableName
      }
    });

    // Grant the lambda role read/write permissions to this table
    todosTable.grantReadWriteData(this.handler);
  }
}
```

and use it in main stack, while removing the unncessary `hello` function

```
import * as cdk from "@aws-cdk/core";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";

import { TodoDatabase } from "./todo-database";

export class NewTodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoDatabase = new TodoDatabase(this, "TodoDatabase");

    const logoBucket = new s3.Bucket(this, "LogoBucket", {
      publicReadAccess: true
    });

    new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: todoDatabase.todoHandler
    });

    new s3Deployment.BucketDeployment(this, "DeployLogo", {
      destinationBucket: logoBucket,
      retainOnDelete: true, // keep current files
      sources: [s3Deployment.Source.asset("./assets")]
    });
  }
}
```

-   Take a look at the `cdk diff`, that's **A LOT** of changes we don't have to do ourselves

-   Deploy the function and `curl -i` the endpoint which is going to fail
-   Debug WTF is going in using CloudWatch
-   Shit's fucked:

`"errorMessage": "User: arn:aws:sts::696785635119:assumed-role/NewTodoAppStack-TodoDatabasetodoHandlerServiceRole-1D3JXVMXTHV5G/NewTodoAppStack-TodoDatabasetodoHandlerA2559B62-IDSJIZW758II is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:eu-central-1:696785635119:table/NewTodoAppStack-TodoDatabase08DB7F4F-F654XN49LOJF",`

-   Grant the lambda role read/write permissions to table in `todoadder-stack`:

```
// Grant the lambda function role read/write permissions to this table
    todoDatabase.grantReadWriteData(this.todoHandler);
```

and run `cdk diff` to see `Get/Put/UpdateItem` etc. allowed for the lambda function and deploy the stack

-   Test the function and notice data being read from DynamoDB

**What we've learned in this section:**

-   Scanning a DynamoDB table using `aws-cdk`
-   Debugging permission issues using CloudWatch logs
-   Granting DynamoDB read/write priviledges to a lambda function (with a single line of code, holy shit)

## Part 6 - Adding and removing data from Todos DynamoDB table

-   Refactor the `todoHandler` function so it can handle both `GET` and `POST` requests, along with some error handling (notice that currently the id is **HARDCODED**):

**REWRITE THIS SECTION**

-   Go to the lambda directory and run `npm init` to create a `package.json` and install `uuid` package
-   Modify the `POST` section of the lambda function to use the `uuid` package:

**REWRITE THIS SECTION**

-   Add a `DELETE` handler so we'll be able to delete a todo item:

**REWRITE THIS SECTION**

-   At the end, our lambda function should look similar to this:

```
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
```

**What we've learned in this section:**

Okay, that section is not easy

-   Adding a new item to a DynamoDB table using `PutItem`
-   Using external packages (in this case - `uuid` in lambda functions created with CDK)
-   Deleting an item from DynamoDB table using `deleteItem`

**Good news - we are not going to touch dynamoDB anymore!**

## Part 7 - Frontend integration

-   Open the `frontend` directory, run the TypeScript React app inside with `yarn start`
-   Inject the API endpoint into the app to try to fetch current todos
-   Notice that backend doesn't work due to CORS
-   Go back to our stack and add CORS preflight options to our REST API. The only thing we need to add is a header in the lambda response since CORS is automatically enabled on the API Gateway level when using `lambdaRestApi` (source: https://github.com/aws/aws-cdk/issues/906).
-   Add following headers to the lambda function response:

```
headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
```

-   Refresh the frontend app and notice that the data is loaded

**What we've learned in this section:**

-   Connecting our new backend to frontend by plugging it into `.env`
-   Enabling CORS in our lambda function

# Part 8 - Deploying the static page to an S3 bucket

-   Build the frontend app by running `npm run build`
-   Install `@aws-cdk/aws-s3-deployment` from npm
-   Go to our stack and create a new bucket for the website and configure a deployment

```
    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html"
    });
```

```
new s3Deployment.BucketDeployment(this, "DeployWebsite", {
      sources: [s3Deployment.Source.asset("../frontend/build")],
      destinationBucket: websiteBucket
    });
```

**Okay, but where the hell is my website?**

-   In order to find out website without digging into S3, we're going to add a new output to our stack using `CfnOutput`:

```
new cdk.CfnOutput(this, "WebsiteUrl", {
      value: websiteBucket.bucketWebsiteUrl
    });
```

-   which will give us a result similar to this one:

```
Outputs:
NewTodoAppStack.WebsiteUrl = http://newtodoappstack-websitebucket75c24d94-sod2pi006ey5.s3-website.eu-central-1.amazonaws.com
NewTodoAppStack.Endpoint8024A810 = https://hrqfdwbly9.execute-api.eu-central-1.amazonaws.com/prod/
```

**What we've learned in this section:**

-   Creating a S3 Bucket deployment to host a static website
-   Creating a custom CloudFormation stack output

# Part 9 - use CDK-SPA-Deploy to avoid Re:Inventing (hah) the wheel:

-   Run `npm install --save cdk-spa-deploy` in `frontend` directory https://github.com/nideveloper/CDK-SPA-Deploy
-   CDK-SPA-Deploy can either deploy a `basic` site or a full CloudFront distribution. Deploying a new distribution takes ~10 minutes so stick to a basic site instead:

```
// Using the SPA Deploy construct from npm:

        new SPADeploy(this, "spaDeploy").createBasicSite({
            indexDoc: "index.html",
            websiteFolder: "../frontend/build"
        });
```

**What we've learned in this section:**

-   We don't have to do everything ourselves, we can use constructs made by community
-   If we want, we can create an entire CDN distribution without leaving our editor

# Part 10

Build the app using AWS Amplify - as of 04.03.2020, I was unable to do that via CDK because it's still experimental

# Part 11

**TESTING!**

## Endgame

-   Destroy the stack by running `cdk destroy`
    > I've used `cdk` to destroy `cdk` - Tony Stark

## Useful tips:

Add a following .prettierc file to the project to avoid problems with DynamoDB SDK:

```
{
    "quoteProps": "preserve"
}
```
