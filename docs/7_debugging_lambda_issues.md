# Build an app with AWS Cloud Development Kit Workshop

## Lesson 07 - Debugging Lambda + DynamoDB issues and managing permissions in the Cloud

This lesson is not AWS CDK specific but it's important to understand what kind of tools we can use to debug issues in our CDK stack.

After all, it's in **THE CLOUD** so it's not like we can restart a laptop and keep our fingers crossed that it'll fix the issue.

To recap, at the end of the last lesson we've managed to create a Lambda function which we want to use to get data from DynamoDB table using the `scan` operation.

Unfortunately, after calling the lambda function we get a following response:

```
"message": "User: arn:aws:sts::696785635119:assumed-role/TodoAppStack-TodoDatabaseTodoHandlerServiceRole991-152UNT6KUIOG2/TodoAppStack-TodoDatabaseTodoHandlerDD6198FE-CPTO6AAJJU5W is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:eu-central-1:696785635119:table/TodoAppStack-TodoDatabaseTodoTable29EA4913-E6Z09XSAAHF8",
```

😭😭😭

Let's see what's going on.

## Exercises

1. Log in to the AWS Console and navigate to our stack in CloudFormation.

2. Find our `TodoHandler` function and go to Lambda Console to investigate. Switch to monitoring tab and click on "View logs in CloudWatch"

3. Okay, now we can see some more details - we're getting an `AccessDeniedException`.

Here's a thing - AWS follows the **Principle of Least Privilege**. The idea is that every user, resource or process in AWS gets the _minimal amount of permissions that are required to get the job done_.

By default, a Lambda function is not able to access the DynamoDB table and that's where the `AccessDeniedException` error comes from.

That's a **good** thing, imagine if while experimenting with Lambda you could drop the entire table or delete your own AWS Account (just in case - I'm not entirely possible if you can remove your own account via a Lambda function but please don't try that 😅).

We have to be explicit - if a Lambda function is meant to have an access to a DynamoDB table, we need to grant that access.

4. Luckily, with AWS CDK this is **really** simple. Use the `grantReadWriteData` function from the `todoTable` in order to allow our `todoHandler` to read/write data from this table.

5. Run `cdk diff` to see the difference

_What exactly is going to change here?_
_Are we going to remove our data by doing that?_

6. Deploy the new version of the stack and try calling the lambda function through an API Gateway again.

🎉🎉🎉🎉🎉

**Congrats!**

We're getting there! You may definitely add "AWS Permissions Expert" to your LinkedIn account!

## What we've learned in this lesson:

- What is the Principle of Least Privilege in AWS
- Granting DynamoDB read/write priviledges to a lambda function (with a single line of code, holy crap)
