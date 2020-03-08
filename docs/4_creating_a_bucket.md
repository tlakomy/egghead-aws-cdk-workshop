# Build an app with AWS Cloud Development Kit Workshop

## Lesson 04 - Creating an S3 bucket

Lambdas and API Gateways are not the only type of AWS resource we can deploy to AWS cloud using CDK. In fact - nearly every resource that is deployable (is that a word?) with CloudFormation, can also be deployed with AWS CDK.

One of the most popular services on AWS is Amazon S3, which stands for `Simple Storage Service`.

As the name suggests - it's nothing but simple (in my humble opinion), luckily creating a new S3 bucket and deploying it to the cloud using CDK is realtively straightforward.

(In case you don't know - **and that's okay** - files on S3 are stored in things called "buckets", which are unlimited in size and each bucket has a **globally** unique name.)

Not only S3 buckets can be used to store files, they can also trigger events whenever something is added/deleted/modified in the bucket. In this lesson we're going to trigger our `hello` lambda function whenever a file

## Exercises

1. Start by importing `@aws-cdk/aws-s3` and creating a new `s3.Bucket`. Call it `LogoBucket` because we're going to use to store an egghead.io logo

   _Did you have to pass in any params in order to create a bucket?_
   _Isn't it a problem that we're going to call the bucket "LogoBucket" since the names are globally unique?_

2. Run `cdk diff` to see what's changed

   _What is the name of the bucket?_

3. Make the bucket public

   _Why do we have to do that? Why aren't files stored in an S3 bucket public by default?_

4. Deploy the bucket to AWS and check in CloudFormation if it exists

5. Trigger a lambda function when a file is uploaded to the bucket using `@aws-cdk/aws-s3-notifications`

   _What types of events can be triggered from S3?_
   _What is going to happen to the helloLambda function after we add this notification?_

6. Use `s3Deployment.BucketDeployment` from `@aws-cdk/aws-s3-deployment` to upload the egghead.io logo to the s3 bucket from CDK

7. Deploy the stack and verify that the logo has been uploaded to S3

## What we've learned in this section:

- Creating an S3 bucket
- Making an S3 bucket public
- Adding an event notification trigger to an S3 bucket to trigger a lambda function
- Deploy a file to an S3 bucket using aws-s3-deployment
