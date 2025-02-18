module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.scss$': 'identity-obj-proxy',  // This is for handling CSS modules in tests
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect', // For using jest-dom matchers like `toBeInTheDocument`
    ],
};
