# Nodejs Express For TypeScript

## Setup

- npm init -y
- npm i express
- npm i -D typescript @types/express @types/node
- npx tsc --init

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