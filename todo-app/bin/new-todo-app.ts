#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { NewTodoAppStack } from "../lesson_01/lib/new-todo-app-stack"; // Change the stack number here at a beginning of each lesson

const app = new cdk.App();
new NewTodoAppStack(app, "NewTodoAppStack");
