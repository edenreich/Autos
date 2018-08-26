import { BaseContext } from "koa";
import { Car } from "../../Models/Car";
import { getManager} from "typeorm";
import ApiController from "./ApiController";
import { Validator, ValidatorFactory } from "../../Classes/Validator";

const models: any = {
    "bmw-x": "bmw-x", 
    "bmw-x6": "bmw-x6"
};

const engines: any = {
    "4-cylinder": "4-cylinder", 
    "6-cylinder": "6-cylinder", 
    "8-cylinder": "8-cylinder", 
    "12-cylinder": "12-cylinder"
};

const infotainmentSystems: any = {
    "tv": "tv", 
    "radio": "radio", 
    "navigation": "navigation"
};

const interiorDesigns: any = {
    "leather": "leather", 
    "carbon": "carbon", 
    "comfort": "comfort"
};

export default class CarsManagementController extends ApiController
{
    /**
     * Displays all cars.
     */
    public static async showAll(ctx: any): Promise<any>
    {
        let cars: Array<Car> = await Car.find();

        if (cars.length <= 0) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, cars);
    }

    /**
     * Displays one car.
     */
    public static async show(ctx: any): Promise<any>
    {
        let car: Car | undefined = await Car.findOne(ctx.params.id);

        if (! car) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, car);
    }

    /**
     * Creates a car.
     */
    public static async create(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        let validator: Validator = await ValidatorFactory.make();

        await validator.carInvalid(inputs.car);

        if (await validator.fails()) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let car: Car = new Car;
        
        car.model = models[inputs.car.model];
        car.engine = engines[inputs.car.engine];
        car.infotainment_system = infotainmentSystems[inputs.car.infotainment_system];
        car.interior_design = interiorDesigns[inputs.car.interior_design];
        car.coordinate_x = inputs.car.coordinate_x;
        car.coordinate_y = inputs.car.coordinate_y;

        let createdCar: Car = await car.save();

        return await ApiController.respondWithData(ctx, createdCar);
    }

    /**
     * Updates a car.
     */
    public static async update(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty('car') === false) {
            return await ApiController.respondValidationFailed(ctx, [], "expected car, but none was given!");
        }

        if (inputs.car.hasOwnProperty('id') === false || inputs.car.id == "") {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected car id, but none was given!"}]);
        }

        let validator: Validator = await ValidatorFactory.make();

        await validator.carInvalid(inputs.car);

        if (await validator.fails()) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let car = await Car.findOne(inputs.car.id);

        if (! car) {
            return await ApiController.respondValidationFailed(ctx, [], "car does not exists!");
        }

        car.model = models[inputs.car.model];
        car.engine = engines[inputs.car.engine];
        car.infotainment_system = infotainmentSystems[inputs.car.infotainment_system];
        car.interior_design = interiorDesigns[inputs.car.interior_design];   
        car.coordinate_x = inputs.car.coordinate_x;
        car.coordinate_y = inputs.car.coordinate_y;
    
        try {
            let modifiedCar: Car = await car.save();

            return await ApiController.respondWithData(ctx, modifiedCar);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }

    /**
     * Deletes a car.
     */
    public static async delete(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("car") === false) {
            return await ApiController.respondValidationFailed(ctx, [], "expected car, but none was given!");
        }

        if (inputs.car.hasOwnProperty("id") === false) {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected car id, but none was given!"}]);
        }

        try {
            let manager = getManager();
            let car = await manager.delete(Car, inputs.car.id);
            
            return await ApiController.respondWithData(ctx, car);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }
}
