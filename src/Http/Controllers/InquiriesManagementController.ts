import { Inquiry } from "../../Models/Inquiry";
import { getManager} from "typeorm";
import ApiController from "./ApiController";
import { Validator, ValidatorFactory } from "../../Classes/Validator";

export default class InquiriesManagementController extends ApiController
{
    /**
     * Displays all inquiries.
     */
    public static async showAll(ctx: any): Promise<any>
    {
        let inquiries: Array<Inquiry> = await Inquiry.find();

        if (inquiries.length <= 0) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, inquiries);
    }

    /**
     * Displays one inquiry.
     */
    public static async show(ctx: any): Promise<any>
    {
        let inquiry: Inquiry | undefined = await Inquiry.findOne(ctx.params.id);

        if (! inquiry) {
            return await ApiController.respondNoContent(ctx);
        }

        return await ApiController.respondWithData(ctx, inquiry);
    }

    /**
     * Creates a inquiry.
     */
    public static async create(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        let validator: Validator = await ValidatorFactory.make();

        await validator.inquiryInvalid(inputs.inquiry);

        if (await validator.fails()) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let inquiry: Inquiry = new Inquiry;

        let createdInquiry: Inquiry = await inquiry.save();

        return await ApiController.respondWithData(ctx, createdInquiry);
    }

    /**
     * Updates an inquiry.
     */
    public static async update(ctx: any): Promise<any>
    {
        
    }

    /**
     * Deletes an inquiry.
     */
    public static async delete(ctx: any): Promise<any>
    {
        
    }
}
