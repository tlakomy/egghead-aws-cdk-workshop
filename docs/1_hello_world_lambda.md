# Build an app with AWS Cloud Development Kit Workshop

## Lesson 01 - Our very first _hello world_ AWS Lambda function

Okay, since we've deleted everything from our stack in the last lesson, we're going to start from scratch.

As we established in [before_we_start.md](/before_we_start.md), we need to switch to different lesson first:

In order to switch from one lesson to another, we'll need to do 2 things:

- in `todo-app/bin/todo-app.ts` change the import for our stack:

```
// Change the lesson number here at a beginning of each lesson
import { TodoAppStack } from "../lesson_01/lib/todo-app-stack";
```

- in `tsconfig.json` ensure that TS compiler will run only for the current lesson (it's necessary due to the way lessons are structured, without it the compiler would freak out because of duplicated types):

```
"include": ["bin/*.ts", "test/*.ts", "lesson_01/**/*.ts"],
```
