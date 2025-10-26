const { createDefaultPreset } = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  clearMocks: true,
};
