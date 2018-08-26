import { Location } from "../../Models/Location";
import { getManager} from "typeorm";
import { Validator, ValidatorFactory } from "../../Classes/Validator";
import ApiController from "./ApiController";

const genders: any = {
    male: "male",
    female: "female"
}

export default class LocationsManagementController extends ApiController
{
    /**
     * Displays all locations.
     */
    public static async showAll(ctx: any): Promise<any>
    {
        let locations: Array<Location> = await Location.find();

        if (locations.length <= 0) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, locations);
    }

    /**
     * Displays one location.
     */
    public static async show(ctx: any): Promise<any>
    {
        let location = await Location.findOne(ctx.params.id);

        if (! location) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, location);
    }

    /**
     * Creates a location.
     */
    public static async create(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("location") === false) {
            return await ApiController.respondValidationFailed(ctx, [], "expected location, but none was given!");
        }

        let validator: Validator = await ValidatorFactory.make();

        await validator.locationInvalid(inputs.location);

        if (await validator.fails()) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let location: Location = new Location;

        location.name = inputs.location.name;
        location.street = inputs.location.street;
        location.zip = inputs.location.zip;
        location.tel = inputs.location.tel;

        try {
            let createdLocation: Location = await location.save();

            return await ApiController.respondWithData(ctx, createdLocation);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }

    /**
     * Updates a location.
     */
    public static async update(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("location") === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected location, but none was given!");
        }

        if (inputs.location.hasOwnProperty('id') === false || inputs.location.id == "") {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected location id, but none was given!"}]);
        }

        let location = await Location.findOne(inputs.location.id);

        if (! location) {
            return await ApiController.respondValidationFailed(ctx, [], "location does not exists!");
        }

        if (inputs.location.hasOwnProperty('name') && inputs.location.name !=  "") {
            location.name = inputs.location.name;
        }

        if (inputs.location.hasOwnProperty('street') && inputs.location.street !=  "") {
            location.street = inputs.location.street;
        }

        if (inputs.location.hasOwnProperty('zip') && inputs.location.zip !=  "") {
            location.zip = inputs.location.zip;
        }

        try {
            let modifiedLocation: Location = await location.save();

            return await ApiController.respondWithData(ctx, modifiedLocation);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }

    /**
     * Deletes a location.
     */
    public static async delete(ctx: any)
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("location") === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected location, but none was given!");
        }

        if (inputs.location.hasOwnProperty("id") === false) {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected location id, but none was given!"}]);
        }

        try {
            let manager = getManager();

            let location: any = await Location.findOne(inputs.location.id);
            
            if (! location) {
                return await ApiController.respondValidationFailed(ctx, [], "location does not exists!");
            }
               
            await manager.delete(location, inputs.location.id)

            return await ApiController.respondWithData(ctx, location);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }
}
