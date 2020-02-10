#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { NewTodoAppStack } from '../lib/new-todo-app-stack';

const app = new cdk.App();
new NewTodoAppStack(app, 'NewTodoAppStack');
