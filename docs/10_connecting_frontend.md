# Build an app with AWS Cloud Development Kit Workshop

## Lesson 10 - Connecting frontend app to an AWS CDK infrastructure

**IT IS TIME.**

Our backend and infrastructure (that we've built ourselves, with TypeScript and CDK!) is ready, now it's time to connect it to a frontend app!

[](https://cultofthepartyparrot.com/parrots/hd/discoparrot.gif)

## Exercises

1. Check out the `frontend` directory, this is where our app lives
1. Run `yarn` (or `npm install`) to install all necessary dependencies
1. Run `npm start` to start up the app
1. Crap, it's broken 🤕

   `Whoops, something is broken - check the console for details`

1. Take a look at the console to figure out what's going on

   _What's a good place to store our endpoint URL?_

1. Replace the URL and try again, it's broken again 😡, crap - what's going on?

   _Get some crayons and draw how you feel about CORS_

1. We need to enable CORS in our API. Luckily we don't need to ask backend folks do to it for us, remember - we are the _entire_ team. Frontend, backend, infrastructure - now we have the necessary skills to take care of all of that with CDK.

1. By default we'd need to enable CORS on API Gateway level but luckily the only thing we need to add is a header in the lambda response since CORS is automatically enabled on the API Gateway level when using `lambdaRestApi` (source: https://github.com/aws/aws-cdk/issues/906).

1. Add `"Access-Control-Allow-Origin": "*"` and `"Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE"` headers to our lambda response

1. Make sure that `OPTIONS` request returns an OK response. To do that - add

```
if (httpMethod === "OPTIONS") {
    return createResponse("ok");
}
```

in the lambda function (otherwise the preflight check will fail 🤕)

1. Fix the `<Logo src="">` in `App.tsx` so that it contains the url to logo that we've deployed previously to an S3 bucket

1. Test the app - notice that we cannot edit a todo right now.

   _Why don't you implement edit functionality after the workshop using your newly acquired skills?_

## What we've learned in this section:

- Connecting our new backend to frontend by plugging it into `.env`
- Enabling CORS in an AWS Lambda function
