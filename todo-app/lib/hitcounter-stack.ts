import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import dynamodb = require("@aws-cdk/aws-dynamodb");

export class HitCounter extends cdk.Construct {
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const hitsTable = new dynamodb.Table(this, "Hits", {
      partitionKey: { name: "path", type: dynamodb.AttributeType.STRING }
    });

    this.handler = new lambda.Function(this, "HitCounterHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "hitcounter-lambda.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        HITS_TABLE_NAME: hitsTable.tableName
      }
    });

    // Grant the lambda role read/write permissions to this table
    hitsTable.grantReadWriteData(this.handler);
  }
}
