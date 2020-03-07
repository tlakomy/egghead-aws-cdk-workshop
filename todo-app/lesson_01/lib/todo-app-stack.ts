import * as cdk from "@aws-cdk/core";

export class TodoAppStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
    }
}
