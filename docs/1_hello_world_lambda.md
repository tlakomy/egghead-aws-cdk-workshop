# Build an app with AWS Cloud Development Kit Workshop

## Lesson 01 - Our very first _hello world_ AWS Lambda function

## Before we start:

Okay, since we've deleted everything from our stack in the last lesson, we're going to start from scratch.

As we established in [before_we_start.md](/before_we_start.md), we need to switch to different lesson first:

In order to switch from one lesson to another, we'll need to do 2 things:

- in `todo-app/bin/todo-app.ts` change the import for our stack:

```js
// Change the lesson number here at a beginning of each lesson
import { TodoAppStack } from "../lesson_01/lib/todo-app-stack";
```

- in `tsconfig.json` ensure that TS compiler will run only for the current lesson (it's necessary due to the way lessons are structured, without it the compiler would freak out because of duplicated types):

```js
"include": ["bin/*.ts", "test/*.ts", "lesson_01/**/*.ts"],
```

## Creating a lambda function

Inside of a `lesson_01` directory, create a new directory to store our "hello world" lambda function - let's call it (original, I know) `lambda`.

Inside of it, create a file called `hello.ts` with a simple lambda function that is going to return a "hello world" message:

```js
exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
  console.log("request:", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, egghead friends! You've hit ${event.path}\n`,
  };
};
```

(By the way, if you're confused about Lambda functions, I have an entire egghead collection about AWS Lambda - give it a shot after the workshop: [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz))

Let's deploy our freshly created Lambda function to AWS. To do that, create a new `lambda.Function` inside of our stack:

```js
const helloLambda = new lambda.Function(this, "HelloLambda", {
  runtime: lambda.Runtime.NODEJS_12_X,
  code: lambda.Code.asset("lesson_01/lambda"),
  handler: "hello.handler",
});
```

(BTW: we can also use a `NodeJsFunction`: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda-nodejs.NodejsFunction.html)

## Exercises

1. Run `cdk diff` to see what is going to be deployed

   _What kind of things are also going to be deployed that we didn't have to configure?_

2. Take a look at props we've passed in to `lambda.Function`.

   _Which ones are mandatory and which ones are optional?_

3. Run `cdk deploy` in order to deploy our very first lambda function

4. Go CloudFormation and take a look at our Lambda function. Beautiful, isn't it?

   _Is there a way for us to call this function?_

5. Test the function using AWS Lambda Console.

## What we've learned so far:

- WTF is an AWS Lambda function
- How to create a new lambda function with AWS CDK
- How to test a newly deployed lambda function in AWS Console
