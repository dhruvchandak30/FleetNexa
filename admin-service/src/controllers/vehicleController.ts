import { NextFunction, Request, Response } from 'express';
import * as vehicleService from '../services/vehicleService';

export const getAllVehicles = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching vehicles' });
    }
};

export const createVehicle = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const vehicleData = await vehicleService.createVehicle(req.body);
        res.status(201).json({ message: 'Vehicle created', data: vehicleData });
    } catch (error) {
        res.status(400).json({ error: 'Error creating vehicle' });
    }
};

export const updateVehicleStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await vehicleService.updateVehicleStatus(
            parseInt(req.params.id),
            req.body.status
        );
        res.status(200).json({ message: 'Vehicle status updated' });
    } catch (error) {
        res.status(400).json({ error: 'Error updating vehicle status' });
    }
};
