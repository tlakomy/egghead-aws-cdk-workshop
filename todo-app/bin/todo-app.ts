#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { TodoAppStack } from '../lib/todo-app-stack';

const app = new cdk.App();
new TodoAppStack(app, 'TodoAppStack');