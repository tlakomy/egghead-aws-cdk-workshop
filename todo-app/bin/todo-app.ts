#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
// Change the lesson number here at a beginning of each lesson
import { TodoAppStack } from "../lesson_01/lib/todo-app-stack";

const app = new cdk.App();
new TodoAppStack(app, "TodoAppStack");
