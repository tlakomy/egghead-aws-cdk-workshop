import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class TodoDatabase extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id);

        new dynamodb.Table(this, "TodoTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
        });
    }
}
