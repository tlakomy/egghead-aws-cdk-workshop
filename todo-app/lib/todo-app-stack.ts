import cdk = require("@aws-cdk/core");
import apiGateway = require("@aws-cdk/aws-apigateway");
import { TodoAdder } from "./todo-adder-stack";

export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoAdder = new TodoAdder(this, "TodoAdderStack", {});

    new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: todoAdder.handler
    });
  }
}
