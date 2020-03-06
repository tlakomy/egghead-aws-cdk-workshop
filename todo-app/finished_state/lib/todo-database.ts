import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

export class TodoDatabase extends cdk.Construct {
    public readonly todoHandler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id);

        const todoDatabase = new dynamodb.Table(this, "TodoDatabase", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
        });

        this.todoHandler = new lambda.Function(this, "todoHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset("finished_state/lambda"),
            handler: "todoHandler.handler",
            environment: { TABLE_NAME: todoDatabase.tableName }
        });

        // Grant the lambda function role read/write permissions to this table
        todoDatabase.grantReadWriteData(this.todoHandler);
    }
}
