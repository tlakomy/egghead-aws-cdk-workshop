# Build an app with AWS Cloud Development Kit Workshop

**Hello!** Welcome to 🌟**Build an app with AWS Cloud Development Kit [egghead.io](https://egghead.io/s/km6vr) Workshop**🌟

Let's start by addressing some questions you might have:

## What do I need to do before the workshop?

Excellent question! If you don't want to follow along during the workshop, you don't need to do anything at all.

If you **do** want to follow along as we build our AWS CDK app (or would like to build it afterwards, remember that a recording **will** be provided all attendees so you can build the app at your own pace 😊) you'll need to perform the following steps:

(**Please go through all of those steps before the workshop because debugging issues with AWS CLI may involve having to share secret access keys and this is NOT something we want to do. If you have any issues with those steps, please reach out to me.**)

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?refid=em_127222) (if you don't have one already).
2. Install **AWS CLI (Command Line Interface)**. We're going to use [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) which is available for Linux, MacOS and Windows (Note: if you have version 1 currently installed, it's absolutely fine, you don't have to upgrade to v2 for the workshop)
3. Configure **AWS CLI** using [this guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
4. To verify that the **AWS CLI** has been successfully installed and configured you can run `aws s3 ls` in your terminal which should list all S3 buckets in the region you've chosen.
5. Install the **AWS SAM (Serverless Application Model) CLI** using [this guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html). **AWS SAM CLI** is available for Linux, MacOS and Windows and we're going to use it during the workshop to run Lambda functions locally.
6. Verify that **AWS SAM CLI** has been successfully installed by running `sam --version` in your terminal. You should see something similar to `SAM CLI, version 0.40.0`.
7. And **finally** (I'm sorry for all of those steps, but this is not my fault :( Good news is that you won't have to do go through that again!) install **AWS CDK (Cloud Development Kit)** by running `npm install -g aws-cdk`
8. Verify that AWS CDK has been successfully installed by running `cdk --version` in your terminal. You should see something similar to `1.26.0 (build e251651)`.

**Congrats!** You are now ready for the workshop! Let's rock!

## Who are you, again?

Hey! My name is Tomasz Łakomy, born & raised in Poland (that's why this workshop is so ... polished) and I'm a Senior Frontend Engineer at OLX Group and an [egghead.io instructor](https://egghead.io/s/km6vr) with over 100 lessons published.

I've been programming for a living since 2012 and for the last couple of years I've been giving talks, writing articles and recording lessons about things I'm interested in - mostly React, testing and (that's why you're here!) - AWS.

AWS is a huge topic, so to solidify my own knowledge and making sure I (more or less) know what I'm talking about, I got AWS certified. I'm currently holding (not literally) an **AWS Certified Solutions Architect: Associate** certificate as well as **AWS Certified Developer: Associate**.

When it comes to AWS itself, I'm especially interested in serverless solutions and I'm happy to say that there won't be **any** servers in this workshop 😎

My twitter handle is [@tlakomy](https://twitter.com/tlakomy) and Twitter is usually the best way to reach me.

## Are we going to go out of AWS Free Tier?

**NO.** Every service we're going to use (and every resource we'll provision) will stay well within the free tier. I invite you to experiment with different AWS services, but everything that is a part of the course won't incur additional charges.

In order to be 100% sure that you won't have to pay more to AWS than you'd like to - take a look at this (5 minute long) free collection:

[Use AWS Billing & Cost Management Dashboard to keep yout AWS bill to minimum](https://egghead.io/playlists/use-aws-billing-cost-management-dashboard-to-keep-your-aws-bill-to-minimum-ff0f?af=6p5abz)

Please take a look at https://aws.amazon.com/free/ to find out more about AWS Free Tier.

## Is there some way I could prepare for this workshop to get the most out of it?

Absolutely!

During this course we're going to talk quite a bit about AWS Lambda, DynamoDB and we're going to play with AWS SAM a bit. This is **not** required but I think you will get more out of the workshop if you take a look at those free resources first (don't worry - I will be explaning those concepts during the workshop as well):

- [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
- [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)
- [Learn DynamoDB from scratch (currently work in progress)](https://egghead.io/playlists/learn-aws-dynamodb-from-scratch-21c3?af=6p5abz)
- [Chris Bascardi](https://egghead.io/instructors/chris-biscardi?af=6p5abz) has an excellent collection of AWS resources as well, take a look a this [Intro to DynamoDB](https://egghead.io/playlists/intro-to-dynamodb-f35a?af=6p5abz) collection.

My own notes: https://gist.github.com/tlakomy/f1312ec1fd092ece75a0f72403235fc8

## Lesson plan

- Lesson 00 - CDK setup and basics
- Lesson 01 - Our very first _hello world_ AWS Lambda function
- Lesson 02 - Changing the properties of a lambda function
- Lesson 03 - Attaching an API Gateway to our lambda function
- Lesson 03.5 - Executing a lambda function locally
- Lesson 04 - Creating an S3 bucket with AWS CDK
- Lesson 05 - Building custom AWS CDK constructs
- Lesson 06 - Reading data from a DynamoDB table with a Lambda function
- Lesson 07 - Debugging Lambda + DynamoDB issues and managing permissions in the Cloud
- Lesson 08 - Adding and removing data from a DynamoDB table
- Lesson 09 - Using external dependencies in a lambda function with CDK
- Lesson 10 - Connecting frontend app to an AWS CDK infrastructure
- Lesson 11 - Deploying the finished app to S3
- Lesson 12 - Deploying the finished app with CDK-SPA-Deploy
- Lesson 13 - Destroying a CDK stack

## What do I do now?

Open the `docs` directory and take a look at [before_we_start.md](docs/before_we_start.md)
