/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/(?!lucide-react)"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
};

export default createJestConfig(config);
