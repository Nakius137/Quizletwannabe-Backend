"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_1 = __importDefault(require("../../middlewears/auth/token"));
const getColecttions_1 = __importDefault(require("../../models/queries/getColecttions"));
const deleteUserSubscription_1 = __importDefault(require("../../models/queries/deleteUserSubscription"));
const router = express_1.default.Router();
router.get("/:email", token_1.default, (req, res) => {
    if (req.query.email) {
        (0, getColecttions_1.default)(req.query.email, res);
    }
    else {
        throw console.error("Błąd w mainie");
    }
});
router.post("/", token_1.default, (req, res) => {
    const { quizName, userEmail } = req.body;
    if (quizName && userEmail) {
        (0, deleteUserSubscription_1.default)(userEmail, quizName);
    }
    else {
        throw console.error("Błąd w postcie main");
    }
});
exports.default = router;
