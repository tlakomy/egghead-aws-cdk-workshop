import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import dynamodb = require("@aws-cdk/aws-dynamodb");

export class TodoAdder extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const todosTable = new dynamodb.Table(this, "Todos", {
      partitionKey: { name: "todo", type: dynamodb.AttributeType.STRING }
    });

    this.handler = new lambda.Function(this, "TodoAdderHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "todoAdder-lambda.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        TODOS_TABLE_NAME: todosTable.tableName
      }
    });

    // Grant the lambda role read/write permissions to this table
    todosTable.grantReadWriteData(this.handler);
  }
}
