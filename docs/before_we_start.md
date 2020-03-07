# Build an app with AWS Cloud Development Kit Workshop

## Before we start

Before we start the workshop I'd like to take a minute to walk you through the structure of the code, as well as how we're going to be interacting with it.

Apart from the `docs` directory (the one you're in right now!) there's also a `frontend` and `todo-app` directory.

- `frontend` contains the code of a React Todo List application which has been implemented for you and it's 99.9% done. What we're going to work on in this workshop is creating a serverless backend and infrastructure for this app using TypeScript.

- `todo-app` contains the source code of an **AWS Cloud Development Kit** stack. We're going to go through it in the `Lesson 00 - CDK setup and basics` but at this moment it's important to understand the `lesson_X` directories.

## Lessons

In this workshop we're going to build a serverless backend and infrastructure for an React app using AWS CDK.

I'm really excited to teach it because we're going to learn **a lot**, not only about CDK but about different AWS services as well.

The plan is to go step by step, that's why there are separate folders for each lesson.

If you get confused and/or lost along the way remember that **every lessons starts where the previous one has ended**. So if you get stuck while working on lesson 4, you can always take a look at the lesson 5.

Due to the way that CDK incrementally adds/removes resources to our AWS stack, I wanted to ensure that we won't have to create a brand new stack for each lesson because that would take too much time.

In order to switch from one lesson to another, we'll need to do 2 things:

- in `todo-app/bin/todo-app.ts` change the import for our stack:

```
// Change the lesson number here at a beginning of each lesson
import { TodoAppStack } from "../lesson_X/lib/todo-app-stack";
```

- in `tsconfig.json` ensure that TS compiler will run only for the current lesson (it's necessary due to the way lessons are structured, without it the compiler would freak out because of duplicated types):

```
"include": ["bin/*.ts", "test/*.ts", "lesson_X/**/*.ts"],
```

One more thing:

## Let's keep it interactive

We're going to spend the next 4 hours together - let's have fun, feel free to ask questions whenever something is not clear :)

There will be quite a lot of time for that, due to the fact that we'll provision resources in AWS which sometimes can take a couple of minutes.
