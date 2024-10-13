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
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = require("../config/supabaseClient");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password_hash, phone_number, role } = req.body;
    if (!name || !email || !password_hash) {
        return res
            .status(400)
            .json({ message: 'Name, email, and password are required.' });
    }
    try {
        if (role === 'admin') {
            const { data, error } = yield supabaseClient_1.supabase
                .from('admins')
                .insert([{ name, email, password_hash }]);
            if (error) {
                return res
                    .status(500)
                    .json({ message: 'Error adding admin', error });
            }
            return res
                .status(201)
                .json({ message: 'Admin registered successfully', data });
        }
        else {
            const { data, error } = yield supabaseClient_1.supabase
                .from('users')
                .insert([{ name, email, password_hash, phone_number }]);
            if (error) {
                return res
                    .status(500)
                    .json({ message: 'Error adding user', error });
            }
            return res
                .status(201)
                .json({ message: 'User registered successfully', data });
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.default = signup;
