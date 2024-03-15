const path = require("path");

module.exports = {
    mode: "production", // Set mode to 'production' for minified output
    entry: "./public/js/chatgptTest.js", // Entry point of your application
    output: {
        filename: "openaiBundle.js", // Output filename
        path: path.resolve(__dirname, "dist"), // Output directory
    },
};
