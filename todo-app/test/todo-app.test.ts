import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import NewTodoApp = require("../finished_state/lib/new-todo-app-stack");

const app = new cdk.App();
const stack = new NewTodoApp.NewTodoAppStack(app, "MyTestStack");

describe("TodoAppStack creates all necessary resources", () => {
    it("Creates a Todo DynamoDB table", () => {
        expectCDK(stack).to(
            haveResource("AWS::DynamoDB::Table", {
                KeySchema: [
                    {
                        AttributeName: "id",
                        KeyType: "HASH"
                    }
                ]
            })
        );
    });

    it("Creates a todoHandler lambda function", () => {
        expectCDK(stack).to(
            haveResource("AWS::Lambda::Function", {
                Handler: "todoHandler.handler",
                Runtime: "nodejs12.x"
            })
        );
    });

    // it("Creates a bucket for the logo", () => {
    //     expectCDK(stack).to(
    //         beASupersetOfTemplate({
    //             "Resources": {
    //                 "LogoBucketEB73FE35": {
    //                     "Type": "AWS::S3::Bucket",
    //                     "UpdateReplacePolicy": "Retain",
    //                     "DeletionPolicy": "Retain"
    //                 }
    //             }
    //         })
    //     );
    // });
});
