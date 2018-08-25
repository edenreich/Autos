import { BaseContext } from "koa";
import { IResponse } from "../../Interfaces/IResponse";
import { Car } from "../../Models/Car";

export default class CarsManagementController
{
    public static async show(ctx: any): Promise<any>
    {
        ctx.body = `showing..${ctx.params.id}`;
        ctx.status = 200;
    }

    public static async create(ctx: any): Promise<any>
    {
        
    }
}
