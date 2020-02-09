import cdk = require("@aws-cdk/core");

export class TodoDatabase extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);
  }
}
