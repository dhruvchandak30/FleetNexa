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
exports.updateDriverStatus = exports.deleteDriver = exports.getAllDrivers = exports.createDriver = void 0;
const config_1 = require("../config");
const createDriver = (driverData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase.from('drivers').insert([
        {
            name: driverData.name,
            email: driverData.email,
            password_hash: driverData.password_hash,
            phone_number: driverData.phone_number,
            status: driverData.status,
        },
    ]);
    if (error) {
        console.log(error);
        throw new Error(error.message);
    }
    return data;
});
exports.createDriver = createDriver;
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase.from('drivers').select('*');
    if (error)
        throw new Error(error.message);
    return data;
});
exports.getAllDrivers = getAllDrivers;
const deleteDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield config_1.supabase.from('drivers').delete().eq('id', id);
    if (error)
        throw new Error(error.message);
});
exports.deleteDriver = deleteDriver;
const updateDriverStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield config_1.supabase.from('drivers').update({ status }).eq('id', id);
    if (error)
        throw new Error(error.message);
});
exports.updateDriverStatus = updateDriverStatus;
