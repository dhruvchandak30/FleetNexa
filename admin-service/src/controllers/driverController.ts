import { NextFunction, Request, Response } from 'express';
import * as driverService from '../services/driverService';

export const getAllDrivers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const drivers = await driverService.getAllDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching drivers' });
    }
};

export const createDriver = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log(req.body);
        const driverData = await driverService.createDriver(req.body);
        res.status(201).json({ message: 'Driver created', data: driverData });
    } catch (error) {
        res.status(400).json({ error: 'Error creating driver' });
    }
};

export const deleteDriver = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await driverService.deleteDriver(Number(req.params.id));
        res.status(200).json({ message: 'Driver deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting driver' });
    }
};

export const updateDriverStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await driverService.updateDriverStatus(Number(req.params.id), req.body.status);
        res.status(200).json({ message: 'Driver status updated' });
    } catch (error) {
        res.status(400).json({ error: 'Error updating driver status' });
    }
}