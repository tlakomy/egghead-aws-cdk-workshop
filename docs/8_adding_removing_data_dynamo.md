# Build an app with AWS Cloud Development Kit Workshop

## Lesson 08 - Adding and removing data from a DynamoDB table

Databases are awesome.

Reading data from a table is fantastic, but you know what's even better?

Being able to **ADD** and **REMOVE** data from a table 🎉

Let's implement it in this lesson.

(BTW: This is the last DynamoDB-specific part of this workshop. If you'd like to, you could implement other features afterwards, for instance - editing a todo, but if you don't want to - it's perfectly fine.)

## Exercises

1. Take a look at the `todoHandler.ts`, there's plenty of code prepared for you - the task is to implement `addTodoItem` and `deleteTodoItem` methods.

Reminder: https://github.com/dabit3/dynamodb-documentclient-cheat-sheet <- this exists and it's an excellent resource. You'll be interested in `dynamo.put` and `dynamo.delete` methods.

2. Let's start with the `addTodoItem`. Once it's implemented (use a hardcoded `id` for now, we'll fix it later), deploy the stack and run a `curl` command in order to test the function. It should look like this:

```
curl --request POST 'https://bn4gqxkbmb.execute-api.eu-central-1.amazonaws.com/prod/' \
--header 'Content-Type: application/json' \
--data-raw '{
        "todo": "test post request"
}'
```

3. Afterwards - implement the `deleteTodoItem`. Once it's done, deploy the stack and run this `curl` command to test it:

```
curl --location --request DELETE 'https://bn4gqxkbmb.execute-api.eu-central-1.amazonaws.com/prod/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"id": "123"
}'
```

4. Congrats! We're going to move on with the rest of the workshop but if you'd like - go back to this lambda function and implement an `editTodo` method :)

## What we've learned in this lesson:

- Using `dynamo.put` and `dynamo.delete` methods in order to add/delete an item from a DynamoDB table
- Testing the API with `curl` call
