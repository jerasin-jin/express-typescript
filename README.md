# Nodejs Express For TypeScript

## Setup

```
npm init -y
npm i express dotenv
npm i -D typescript @types/express @types/node
npx tsc --init
```

### change `tsconfig.json` By default, the value of this option is set to the project’s root. Change it to dist, as shown below

```
{
  "compilerOptions": {
    ...
    "outDir": "./dist"
    ...
  }
}
```

## Running TypeScript in Node with ts-node

```sh
npx ts-node src/index.ts
```

## Watching file changes

```sh
npm i -D nodemon ts-node concurrently
```

## After installing these dev dependencies, update the scripts in the package.json file as follows

```
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }
}
```



## Generate Schema For PrismaClient
```
npx prisma generate
```

## Run Command To Mirgate Schema
```
npx prisma db push --schema prisma/schema
```

## Create Migrate
```
npx prisma migrate dev
```

## Tech

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Prisma] - orm for database
