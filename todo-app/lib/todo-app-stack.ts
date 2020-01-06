import cdk = require("@aws-cdk/core");
import apiGateway = require("@aws-cdk/aws-apigateway");
import s3 = require("@aws-cdk/aws-s3");

import { TodoAdder } from "./todo-adder-construct";

export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoAdder = new TodoAdder(this, "TodoAdderStack", {});

    new s3.Bucket(this, "LogoBucket", {
      publicReadAccess: true
    });

    new apiGateway.LambdaRestApi(this, "TodoEndpoint", {
      handler: todoAdder.handler
    });
  }
}
