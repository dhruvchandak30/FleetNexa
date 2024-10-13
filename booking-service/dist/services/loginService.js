"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = require("../config/supabaseClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Role, email, and password are required.' });
    }
    try {
        let data;
        let error;
        if (role === 'admin') {
            ({ data, error } = yield supabaseClient_1.supabase
                .from('admins')
                .select('email, password_hash')
                .eq('email', email)
                .single());
        }
        else if (role === 'driver') {
            ({ data, error } = yield supabaseClient_1.supabase
                .from('drivers')
                .select('email, password_hash')
                .eq('email', email)
                .single());
        }
        else if (role === 'user') {
            ({ data, error } = yield supabaseClient_1.supabase
                .from('users')
                .select('email, password_hash')
                .eq('email', email)
                .single());
        }
        if (error || !data) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password.' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, data.password_hash);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password.' });
        }
        return res.status(200).json({
            message: `${role} logged in successfully!`,
            email: data.email,
        });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.default = login;
