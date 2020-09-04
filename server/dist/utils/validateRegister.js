"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
exports.validateRegister = (options) => {
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "length must be greater than 2",
            },
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "Please enter a valid email",
            },
        ];
    }
    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                message: "Cannot include an @",
            },
        ];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "length must be greater than 2",
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map