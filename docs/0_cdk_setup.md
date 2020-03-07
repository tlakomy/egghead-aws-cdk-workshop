# Build an app with AWS Cloud Development Kit Workshop

## Lesson 00 - CDK setup and basics

## What is AWS CDK?

According to the docs:

> "The AWS Cloud Development Kit (AWS CDK) is an open source software development framework to model and provision your cloud application resources using familiar programming languages."

In other words: AWS CDK allows us to use a programming language that we all know and love (or at least tolerate) - TypeScript - to define and provision an infrastructure of an app in AWS cloud.

AWS Lambda, S3 buckets, DynamoDB tables, API Gateways - we can define all those resources (and connections between them) with TypeScript and deploy those to the Cloud without even leaving our editor.

You don't have to use TypeScript though! AWS CDK supports TypeScript, JavaScript, Python, C# and Java.

## How does it work?

Cloud Development Kit is built on top of CloudFormation which is an AWS service that allows you to describe a stack in AWS using a static file (either YAML or JSON).

In essence - it's going to convert our code written in TypeScript, to JavaScript, which will be then converted to CloudFormation and CloudFormation will be used to deploy our infrastructure.

Sounds complicated, right? Luckily CDK abstracts **a lot** of things away from us, so we get to focus on solving our problems instead of writing YAML by hand.

## What's inside of a lesson 00?

Let's take a look at `lesson_00/lib/todo-app-stack.ts`.

There are some things that I did for you beforehand and you're seeing a result of it. (You're welcome!)

What you're seeing inside is a result of running

`cdk init sample-app --language=typescript`

which creates a sample stack with an SQS Queue and SNS Topic.

(_Note: you don't need to know what is SQS and SNS, that's perfectly fine_).

## Anatomy of a stack

Let's go through it from the top:

```
import * as sns from "@aws-cdk/aws-sns";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";
```

The only thing you **need** to import is the `@aws-cdk/core` part. The rest of imports depends on what kind of resources you're going to use in your stack.

For instance - if you're going to create an S3 bucket, you'd import:

```js
import * as s3 from "@aws-cdk/aws-s3";
```

Next, we're creating a new class which extends from `cdk.Stack`. Inside of it, we're going to initialize all resources that we'd like to provision in AWS.

In this example, we see that our stack is going to create an SQS Queue and SNS Topic (again, you don't _have_ to know what they are, just that they are going to be created).

```js
const queue = new sqs.Queue(this, "TestCdkQueue", {
  visibilityTimeout: cdk.Duration.seconds(300)
});

const topic = new sns.Topic(this, "TestCdkTopic");
```

Both `sqs.Queue` and `sns.Topic` are instancs of something that is called a **construct** in CDK.

Let me quote the official docs here:

> Constructs are the basic building blocks of AWS CDK apps. A construct represents a "cloud component" and encapsulates everything AWS CloudFormation needs to create the component.

> A construct can represent a single resource, such as an Amazon Simple Storage Service (Amazon S3) bucket, or it can represent a higher-level component consisting of multiple AWS CDK resources.

In other words - a **construct** is an instance of **something** that will get provisioned inside of an AWS cloud.

The best part is that you can create your own constructs and even use constructs that were created by the community!

And we're going to do both of those things in this workshop 🥳

Every construct takes 3 arguments:

- `scope` - a context in which the construct is created (it's always `this` to be honest, at least in my experience)
- `id` - an identifier for a construct which is unique within its scope. (This allows you to call something `myS3Bucket` instead of `S3BucketRANDOM_ID_WHAT_IS_THIS`)
- `props` - a set of properties for this construct. Since we're using TypeScript, our editor will help us understand what kind of props we can set for each construct and which ones are mandatory.

## Exercises

0. Run `npm run watch` in order to start a TypeScript compiler in `watch` mode
1. Run `cdk synth` in order to generate a CloudFormation template from our sample stack.

   _Which one would you prefer to maintain?_

1. Run `cdk deploy` in order to deploy our stack to AWS (you might need to run `cdk bootstrap` to initialize necessary helper resources, used internally by CDK).

   _What kind of info do we see before we deploy?_

   _Is it possible to deploy stuff we don't want by accident?_

1. Log in to AWS Console and take a look at our stack in CloudFormation.

   _How can we see what the heck did we just deploy?_

1. Delete the `sqs.Queue` and `sns.Topic` in `todo-app-stack.ts`, we won't need them no more. Run `cdk diff` to see the difference between currently deployed stack and our local version.

   _What's going to happen to our resources once we run `cdk deploy` again?_

1. Run `cdk deploy` again and check out the result in CloudFormation console

## What we've learned so far:

- What's Amazon CDK
- Deploying stacks to AWS
- Reviewing differences between stacks with `cdk diff`
- Reviewing generated CloudFormation template with `cdk synth`

## References

- https://aws.amazon.com/cdk/
- https://docs.aws.amazon.com/cdk/latest/guide/home.html
- https://github.com/eladb/awesome-cdk
- https://github.com/cdk-patterns/serverless
