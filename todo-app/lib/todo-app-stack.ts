import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import apiGateway = require("@aws-cdk/aws-apigateway");
import { HitCounter } from "./hitcounter-stack";

export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hitCounter = new HitCounter(this, "HelloHitCounter", {});

    new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: hitCounter.handler
    });
  }
}
