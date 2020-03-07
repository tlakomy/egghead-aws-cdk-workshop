#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { TodoAppStack } from "../lesson_00/lib/todo-app-stack"; // Change the lesson number here at a beginning of each lesson

const app = new cdk.App();
new TodoAppStack(app, "TodoAppStack");
