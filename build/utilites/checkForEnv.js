"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkForEnv = (variable) => {
    if (!variable) {
        throw new Error("Missing env");
    }
    return variable;
};
exports.default = checkForEnv;
