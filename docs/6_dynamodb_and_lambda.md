# Build an app with AWS Cloud Development Kit Workshop

## Lesson 06 - Reading data from a DynamoDB table with a Lambda function

Now we're getting somewhere 🎉

Our stack has plenty of resources and how it's the time to start combining them together.

In this lesson we're going to create a new lambda function that will read data from our new `TodoTable`.

Since we don't want to add unnecessary noise, we're going to define the lambda function in the `TodoDatabase` stack. After all - whoever will end up using that stack shouldn't have worry too much about the underlying details. That's the power of CDK - we get to abstract away unnecesary implementation details and focusing on solving problems by deploying infrastructure and resources we need to solve them.

## Exercises

1. Remove the `Hello` lambda function we've created before, we won't need it no more and we'd like to avoid unnecessary noise. (_Don't worry - if you'd like to take a look how it was implemented you can always check out lesson_05_)

2. Take a look at `todoHandler.ts` lambda function that's going to list all the items from the table using a `scan` operation. It's mostly implemented for us but we need to use the `DocumentClient` SDK in order to get all the todo items from our DB.

(_Don't worry, here's a helpful cheat sheet: https://github.com/dabit3/dynamodb-documentclient-cheat-sheet_)

3. Create a `lambda.Function` construct in `todo-database.ts` stack so we'll be able to deploy the function.

**NOTE:** `todoHandler.ts` function needs a `TABLE_NAME` env variable in order to work properly, make sure to provide that.

_How is it possible for us to know the name of the table though? Remember that the second argument to a construct (the one after `this`) is not an actual name of the resource that gets created_

4. Next, make sure that it's possible to get the reference to our new lambda function in the main stack. Luckily, in TypeScript we can export it as a `public readonly` field.

5. Go to the main stack and instead of connecting the `hello` function (which we've already deleted) to an API Gateway, connect the new `todoHandler` instead. Make sure to also remove the `addEventNotification` for the hello function since we won't need that anymore.

(Just in case: this lesson has a bit more code than previous ones. If you get lost please remember that every lesson starts where the previous one ended, which means you can always take a look at the code in the next lesson 😁)

6. Run `cdk diff` to see what are we about to deploy, just to double check

7. Deploy the stack

8. Send a GET request to the API Gateway to execute the lambda function (using `curl` command for example)

**HECK**

It won't work 😭😭😭

```
"message": "User: arn:aws:sts::696785635119:assumed-role/TodoAppStack-TodoDatabaseTodoHandlerServiceRole991-152UNT6KUIOG2/TodoAppStack-TodoDatabaseTodoHandlerDD6198FE-CPTO6AAJJU5W is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:eu-central-1:696785635119:table/TodoAppStack-TodoDatabaseTodoTable29EA4913-E6Z09XSAAHF8",
```

_Do you know what's may cause the error?_

## What we've learned in this lesson:

- Creating a lambda function that is able to scan a DynamoDB table using `aws-cdk`
- Exposing a lambda function from a construct to be used in another one (like we did with the `handler` function)
