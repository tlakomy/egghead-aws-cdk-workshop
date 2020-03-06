#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { NewTodoAppStack } from "../finished_state/lib/new-todo-app-stack"; // Change the lesson number here at a beginning of each lesson

const app = new cdk.App();
new NewTodoAppStack(app, "NewTodoAppStack");
