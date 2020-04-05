# Build an app with AWS Cloud Development Kit Workshop

## Lesson 12 - Deploying the finished app with CDK-SPA-Deploy

Our website deployment is by no means perfect, for instance - we don't have any CDN (like CloudFront) in place so our website may be slow for some users.

Of course it is possible to setup CloudFront distribution with CDK, deploy it but it does kinda feel like reinventing the wheel, does it?

If only we could use a construct written by somebody else so we won't have to do all that work on our own 🤔

Guess what - that's exactly what we're going to do!

## Exercises

1. Delete the website bucket, bucket deployment and `CfnOutput` from `todo-app-stack.ts` that we've added in the previous lesson - we're going to replace them with `cdk-spa-deploy`

2. [cdk-spa-deploy](https://github.com/nideveloper/CDK-SPA-Deploy) is a package available on Github which is "an AWS CDK Construct to make deploying a single page website (Angular/React/Vue) to AWS S3 behind SSL/Cloudfront as easy as 5 lines of code.". Exactly what we need

3. Add `import { SPADeploy } from "cdk-spa-deploy";` to `todo-app-stack.ts`

4. `SPADeploy` allows us to either `createBasicSite` or `createSiteWithCloudfront`. For production apps it would be better to set up CloudFront but this takes a couple of minutes at least. Let's create a basic site instead and you're free to setup a cloudfront distribution after the workshop 🤠

5. Run `cdk diff` to check out what exactly `SPADeploy` is going to create

6. Deploy the app

## What we've learned in this lesson:

- We don't have to do everything ourselves, we can use constructs made by community
- If we want, we can create an entire CDN distribution without leaving our editor
