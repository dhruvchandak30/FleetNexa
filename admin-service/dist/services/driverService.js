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
exports.getAllDrivers = exports.createDriver = void 0;
const config_1 = require("../config");
const createDriver = (driverData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase
        .from('drivers')
        .insert([{
            name: driverData.name,
            email: driverData.email,
            password_hash: driverData.passwordHash,
            phone_number: driverData.phoneNumber,
            vehicle_id: driverData.vehicleId,
            status: driverData.status,
            created_at: new Date(),
            updated_at: new Date(),
        }]);
    if (error)
        throw new Error(error.message);
    return data;
});
exports.createDriver = createDriver;
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase
        .from('drivers')
        .select('*');
    if (error)
        throw new Error(error.message);
    return data;
});
exports.getAllDrivers = getAllDrivers;
