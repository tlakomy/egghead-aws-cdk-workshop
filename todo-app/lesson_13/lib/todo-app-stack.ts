import * as cdk from "@aws-cdk/core";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import { TodoDatabase } from "./todo-database";
import { SPADeploy } from "cdk-spa-deploy";

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

        new SPADeploy(this, "WebsiteDeployment").createBasicSite({
            indexDoc: "index.html",
            websiteFolder: "../frontend/build"
        });
    }
}
