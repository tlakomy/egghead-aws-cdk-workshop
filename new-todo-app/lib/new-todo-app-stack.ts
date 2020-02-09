import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";

import { Duration } from "@aws-cdk/core";

export class NewTodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logoBucket = new s3.Bucket(this, "LogoBucket", {});

    const helloLambda = new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("lambda"),
      handler: "hello.handler",
      timeout: Duration.seconds(10),
      memorySize: 256,
      environment: { secret_db_key: "Password1" }
    });

    new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: helloLambda
    });
  }
}
