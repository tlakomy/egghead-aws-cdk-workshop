import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";

export class TodoAppStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

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
    }
}
