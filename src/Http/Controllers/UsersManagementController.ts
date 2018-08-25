import { BaseContext } from "koa";
import { IResponse } from "../../Interfaces/IResponse";
import { User } from "../../Models/User";
import { HttpStatus } from "../HttpStatus";
import { Validator } from "../../Classes/Validator";
import * as bcrypt from "bcrypt";

export default class UsersManagementController
{
    /**
     * Displays one user.
     */
    public static async show(ctx: any): Promise<any>
    {
        let response: IResponse = {};
        let user = await User.findOne(ctx.params.id);

        if (! user) {
            response.success = false;
            response.data = [];
            response.message = "no content!";
            response.status = HttpStatus.NO_CONTENT;
            ctx.body = response;
            ctx.status = HttpStatus.NO_CONTENT;
            return;
        }

        response.success = true;
        response.data = user;
        response.message = "success!";
        response.status = HttpStatus.OK;

        ctx.body = response;
        ctx.status = HttpStatus.OK;
    }

    /**
     * Creates one user.
     */
    public static async create(ctx: any): Promise<any>
    {
        let response: IResponse = {};
        let inputs = ctx.request.body;

        if (Validator.userInvalid(inputs.user)) {
            response.success = false;
            response.message = "validation error!";
            response.status = HttpStatus.UNPROCESSABLE_ENTITY;
            ctx.body = response;
            ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;
            return;
        }

        let user: User = new User;

        let password = inputs.user.password || Math.random().toString(36).slice(-8);

        user.name = inputs.user.name;
        user.gender = inputs.user.gender;
        user.age = inputs.user.age;
        user.password = await bcrypt.hash(password, 10);

        let createdUser: User = await user.save();

        delete createdUser.password;

        response.success = Object.keys(createdUser).length ? true : false;
        response.message = "success!";
        response.data = createdUser;
        response.status = 200;

        ctx.body = response;
        ctx.status = response.status;
    }

    /**
     * Edit one user.
     */
    public static async edit(ctx: any): Promise<any>
    {

    }
}
