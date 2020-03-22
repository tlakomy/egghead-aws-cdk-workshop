import * as cdk from "@aws-cdk/core";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import { TodoDatabase } from "./todo-database";
import * as amplify from "@aws-cdk/aws-amplify";

export class TodoAppStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const todoDatabase = new TodoDatabase(this, "TodoDatabase");

        new apiGateway.LambdaRestApi(this, "Endpoint", {
            handler: todoDatabase.handler
        });

        const logoBucket = new s3.Bucket(this, "LogoBucket", {
            publicReadAccess: true
        });

        new s3Deployment.BucketDeployment(this, "DeployLogo", {
            destinationBucket: logoBucket,
            sources: [s3Deployment.Source.asset("./assets")]
        });

        const todoAmplifyApp = new amplify.CfnApp(this, "TodoAmplifyApp", {
            name: "todo-app",
            oauthToken: "5d2b0e970ea54d423c857fb1498d28f2967e02b1",
            repository: "https://github.com/tlakomy/egghead-aws-cdk-workshop"
        });

        new amplify.CfnBranch(this, "MasterBranch", {
            appId: todoAmplifyApp.attrAppId,
            branchName: "master"
        });
    }
}
