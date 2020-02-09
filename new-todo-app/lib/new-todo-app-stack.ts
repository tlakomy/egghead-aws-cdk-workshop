import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Notifications from "@aws-cdk/aws-s3-notifications";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";

import { Duration } from "@aws-cdk/core";
import { EventType } from "@aws-cdk/aws-s3";

export class NewTodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logoBucket = new s3.Bucket(this, "LogoBucket", {
      publicReadAccess: true
    });

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

    logoBucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new s3Notifications.LambdaDestination(helloLambda)
    );

    new s3Deployment.BucketDeployment(this, "DeployLogo", {
      destinationBucket: logoBucket,
      retainOnDelete: true, // keep current files
      sources: [s3Deployment.Source.asset("./assets")]
    });
  }
}
