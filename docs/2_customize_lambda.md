# Build an app with AWS Cloud Development Kit Workshop

## Lesson 02 - Changing the properties of a lambda function

Every AWS resource that we deploy to AWS console is using a set of default values (note that we didn't have to configure the timeout value of the lambda function and the memory size available to it).

## Exercises

1. Increase the memory available to the lambda function to 256MB
1. Increase the timeout to 10 seconds using `Duration.seconds`

   _What is the maximum duration of a lambda function?_
   _Why shouldn't we just set it to a maximum value to ensure that a timeout rarely occurs?_

1. Lambda functions can use environment variables. Use the `environment` property in order to pass in the `isProduction` property and set it to `absolutely not`. Use `console.log` in lambda function to log it out.
1. Run `cdk diff` in order to see what's changed

   _Is our lambda function going to be destroyed? What exactly is going to change?_

1. Run `cdk deploy` and test the function in AWS Console

   _Did we have to open the CDK docs in order to see what kind of properties we can set for our function?_
