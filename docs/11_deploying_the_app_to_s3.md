# Build an app with AWS Cloud Development Kit Workshop

## Lesson 11 - Deploying the finished app to S3

Now that our app is ready, we need to deploy it somewhere so that it longer lives in `localhost` only.

There are _multiple_ ways we can deploy an app like this and the usual way of doing that in AWS is to simply put the app on Simple Storage Service (S3).

We _could_ just upload the files manually to a bucket but come on, this is 2020 - we need to automate that.

## Exercises

1. Build the frontend app by running `npm run build` in `frontend` directory

1. Go to `todo-app-stack.ts` and create a new public bucket for our website (make sure to specify `websiteIndexDocument`).

1. Next, create a new `BucketDeployment` (similar to the one we did for the egghead logo)

1. Okay, the app is going to get deployed _somewhere_, but how do we get the address?

1. Add a new `cdk.CfnOutput` with a `websiteBucket.bucketWebsiteUrl` so we'll have an easy access to our app once the stack is deployed

1. Take a look at `cdk diff`, just in case

1. Deploy the stack

**Yay!** We have a working app deployed to S3 🎉

## What we've learned in this lesson:

- Creating a S3 Bucket deployment to host a static website
- Creating a custom CloudFormation stack output
