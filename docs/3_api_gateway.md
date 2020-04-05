# Build an app with AWS Cloud Development Kit Workshop

## Lesson 03 - Attaching an API Gateway to our lambda function

So far we've managed to deploy a Lambda function but... we cannot call it outside of the AWS Console.

Lambda functions are meant to be called as a response to an event - whether it's a file being uploaded to an S3 bucket, something appearing in a database or (the most common use case) - an HTTP request.

In order to use HTTP GET request to call our lambda function we need to attach an API Gateway to it.

To quote the docs:

> Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. APIs act as the "front door" for applications to access data, business logic, or functionality from your backend services. Using API Gateway, you can create RESTful APIs and WebSocket APIs that enable real-time two-way communication applications

TL;DR - through the API Gateway we can call a lambda function from the Internet, and this is what we want.

## Exercises:

1. Import a `"@aws-cdk/aws-apigateway";` in our stack

2. Create a new `LambdaRestApi` using the `aws-apigateway` and set it to call our lambda function.

   _Why do we need a 'Gateway' to call a lambda function?_

3. Run `cdk diff` in order to see what we're about to deploy.

   _Notice how much stuff we get to deploy/configure with a single line. Neat, huh?_

4. Deploy our stack and call the lambda function using both `curl` and the browser

   _How do we know which URL to call?_

## What we've learned so far:

- What is an API Gateway?
- How to create an API Gateway with AWS CDK and how to attach a lambda function to its
