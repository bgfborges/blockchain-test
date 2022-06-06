module.exports = {
    testIgnorePatterns: ["./node_modules", "./next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|ts|jsx|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    testEnviroment: 'jest-environment-jsdom'
}