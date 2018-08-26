import { BaseContext } from "koa";
import { User } from "../../Models/User";
import { getManager} from "typeorm";
import { Validator, ValidatorFactory } from "../../Classes/Validator";
import * as bcrypt from "bcrypt";
import ApiController from "./ApiController";

const genders: any = {
    male: "male",
    female: "female"
}

export default class UsersManagementController extends ApiController
{
    /**
     * Displays all users.
     */
    public static async showAll(ctx: any): Promise<any>
    {
        let users: Array<User> = await User.find();

        if (users.length <= 0) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, users);
    }

    /**
     * Displays one user.
     */
    public static async show(ctx: any): Promise<any>
    {
        let user = await User.findOne(ctx.params.id);

        if (! user) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, user);
    }

    /**
     * Creates a user.
     */
    public static async create(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("user") === false) {
            return await ApiController.respondValidationFailed(ctx, [], "expected user, but none was given!");
        }

        let validator: Validator = await ValidatorFactory.make();

        if (await validator.userInvalid(inputs.user)) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let user: User = new User;

        let password = inputs.user.password || Math.random().toString(36).slice(-8);

        user.name = inputs.user.name;
        user.gender = genders[inputs.user.gender];
        user.age = inputs.user.age;
        user.password = await bcrypt.hash(password, 10);

        let createdUser: User = await user.save();

        delete createdUser.password;

        return await ApiController.respondWithData(ctx, createdUser);
    }

    /**
     * Updates a user.
     */
    public static async update(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("user") === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected user, but none was given!");
        }

        if (inputs.user.hasOwnProperty('id') === false || inputs.user.id == "") {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected user id, but none was given!"}]);
        }

        let user = await User.findOne(inputs.user.id);

        if (! user) {
            return await ApiController.respondValidationFailed(ctx, [], "user does not exists!");
        }

        if (inputs.user.hasOwnProperty('name') && inputs.user.name !=  "") {
            user.name = inputs.user.name;
        }

        if (inputs.user.hasOwnProperty('gender') && inputs.user.gender !=  "") {
            user.gender = genders[inputs.user.gender];
        }

        if (inputs.user.hasOwnProperty('age') && isNaN(inputs.user.age) === false) {
            user.age = inputs.user.age;
        }

        try {
            let modifiedUser: User = await user.save();

            delete modifiedUser.password;

            return await ApiController.respondWithData(ctx, modifiedUser);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }

    /**
     * Deletes a user.
     */
    public static async delete(ctx: any)
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("user") === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected user, but none was given!");
        }

        if (inputs.user.hasOwnProperty("id") === false) {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected user id, but none was given!"}]);
        }

        try {
            let manager = getManager();
            let user = await manager.delete(User, inputs.user.id);
            
            return await ApiController.respondWithData(ctx, user);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }
}
