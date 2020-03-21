import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

export class TodoDatabase extends cdk.Construct {
    public readonly handler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id);

        const todosTable = new dynamodb.Table(this, "TodoTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
        });

        this.handler = new lambda.Function(this, "TodoHandler", {
            code: lambda.Code.fromAsset("lesson_07/lambda"),
            handler: "todoHandler.handler",
            runtime: lambda.Runtime.NODEJS_12_X,
            environment: {
                TABLE_NAME: todosTable.tableName
            }
        });
    }
}
