import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Notifications from "@aws-cdk/aws-s3-notifications";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import { TodoDatabase } from "./todo-database";
import { EventType } from "@aws-cdk/aws-s3";

export class TodoAppStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const todoDatabase = new TodoDatabase(this, "TodoDatabase");

        const helloLambda = new lambda.Function(this, "HelloLambda", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset("lesson_04/lambda"),
            handler: "hello.handler",
            timeout: cdk.Duration.seconds(10),
            memorySize: 256,
            environment: { isProduction: "absolutely not" }
        });

        new apiGateway.LambdaRestApi(this, "Endpoint", {
            handler: helloLambda
        });

        const logoBucket = new s3.Bucket(this, "LogoBucket", {
            publicReadAccess: true
        });

        logoBucket.addEventNotification(
            EventType.OBJECT_CREATED,
            new s3Notifications.LambdaDestination(helloLambda)
        );

        new s3Deployment.BucketDeployment(this, "DeployLogo", {
            destinationBucket: logoBucket,
            sources: [s3Deployment.Source.asset("./assets")]
        });
    }
}
