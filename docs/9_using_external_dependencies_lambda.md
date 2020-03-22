# Build an app with AWS Cloud Development Kit Workshop

## Lesson 09 - Using external dependencies in a lambda function with CDK

Our `todoHandler.ts` lambda function is not using any external dependencies at the moment and this is not the reality of most JS applications - the same applies for Lambda functions.

As you remember, in last lesson we ended up hardcoding an `id` when adding a new item, but using a unique id is **definitely** a better solution.

Let's change our function to use a `uuid()` package from `npm` instead in this quick lesson.

## Exercises

1. Go to `lesson_10/lambda` directory and run `npm init -y`
2. Install `uuid` - `yarn add uuid`
3. Use `uuid()` package in the lambda function to be used if an `id` was not provided by whoever sent the request.
4. Deploy the stack (remember to change the lesson number in `todo-database.ts` beforehand)
5. Run the `curl` command again in order to validate that the `todo` has been created with a random id:

```
curl --request POST 'https://bn4gqxkbmb.execute-api.eu-central-1.amazonaws.com/prod/' \
--header 'Content-Type: application/json' \
--data-raw '{
        "todo": "test post request"
}'
```

6. Take a look at the lambda function in AWS Console to see what happened to the `node_modules` and where they ended up.
