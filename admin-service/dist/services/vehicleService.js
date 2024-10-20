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
exports.updateVehicleStatus = exports.getAllVehicles = exports.createVehicle = void 0;
const config_1 = require("../config");
const createVehicle = (vehicleData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase.from('vehicles').insert([
        {
            type: vehicleData.type,
            license_plate: vehicleData.license_plate,
            capacity: vehicleData.capacity,
        },
    ]);
    if (error) {
        console.log(error);
        throw new Error(error.message);
    }
    return data;
});
exports.createVehicle = createVehicle;
const getAllVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase.from('vehicles').select('*');
    if (error)
        throw new Error(error.message);
    return data;
});
exports.getAllVehicles = getAllVehicles;
const updateVehicleStatus = (vehicleId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase
        .from('vehicles')
        .update({ status })
        .eq('id', vehicleId);
    if (error)
        throw new Error(error.message);
    return data;
});
exports.updateVehicleStatus = updateVehicleStatus;
