# Build an app with AWS Cloud Development Kit Workshop

## Lesson 05 - Building custom AWS CDK constructs

As we can see, our stack is growing with every lesson.

It's okay for now, but if we continue adding more and more resources to `todo-app-stack.ts` it may become difficult to maintain.

There's a solution for that problem though, we can create our own custom AWS CDK constructs.

### What's an AWS CDK construct?

Let's recap for a bit, to make sure that all of us are on the same page.

To quote the docs:

> Constructs are the basic building blocks of AWS CDK apps. A construct represents a "cloud component" and encapsulates everything AWS CloudFormation needs to create the component.

> A construct can represent a single resource, such as an Amazon Simple Storage Service (Amazon S3) bucket, or it can represent a higher-level component consisting of multiple AWS CDK resources.

We've been using a single-resource constructs so far - for instance to create an S3 bucket in the last lesson we've used the `s3.Bucket` construct and to create a Lambda function we've used the `lambda.Function` one.

But _we can go deeper_.

Constructs don't have to represent a single resource - imagine creating a **single** construct that's going to create a DynamoDB table, lambda function and other resources.

Well, you don't have to imagine because that's exactly what we're going to do in this lesson 🥳

One more note - it's absolutely possible to create custom constructs and put them on package managers like npm for others to use in the applications. Some companies are even building their internal CDK libraries with a pre-defined stack they use across all their projects - making their developers much more productive when starting new projects.

## Exercises

1. Create a new file in `lib` directory, we're going to call it `todo-database.ts`.

2. Create a new empty `TodoDatabase` construct:

```js
import * as cdk from "@aws-cdk/core";

export class TodoDatabase extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);
  }
}
```

3. Import and create an instance of the construct in the main `todo-app-stack.ts` stack

4. Answer the question below and run `cdk diff` after to see if you were right

   _What's going to happen after we run cdk diff? What kind of resouce is going to be created after adding the `TodoDatabase` construct?_

5. Import `dynamodb` from `"@aws-cdk/aws-dynamodb"` and use it to create a new DynamoDB table with a `partitionKey` `"id"` which is of `dynamodb.AttributeType.STRING`

   _What is a partitionKey in a DynamoDB table?_

   (If you need to learn a bit more about DynamoDB check out [Learn DynamoDB from scratch (currently work in progress)](https://egghead.io/playlists/learn-aws-dynamodb-from-scratch-21c3?af=6p5abz) from yours truly and [Chris Bascardi](https://egghead.io/instructors/chris-biscardi?af=6p5abz) has an excellent collection of AWS resources as well, take a look a this [Intro to DynamoDB](https://egghead.io/playlists/intro-to-dynamodb-f35a?af=6p5abz) collection.)

6. Run `cdk diff` to see what we're about to deploy

7. Run `cdk deploy` and deploy our brand new DynamoDB table

8. Log in to AWS Console and add two sample items to DynamoDB table, something like this:

```
{
  "id": "123",
  "isCompleted": false,
  "todo": "Learn AWS CDK"
}
```

_Why do we need to have an 'id' field?_
_We didn't define those `isCompleted` and `todo` fields anywhere, how is it going to work?_

## What we've learned in this lesson:

- Creating a new CDK Construct from scratch and importing it in main stack
- Creating a DynamoDB table
- Adding new items to a DynamoDB table in AWS Console
