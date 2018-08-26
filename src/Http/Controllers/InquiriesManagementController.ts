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

        if (inputs.hasOwnProperty("inquiry") === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected inquiry, but none was given!");
        }

        let validator: Validator = await ValidatorFactory.make();

        await validator.inquiryInvalid(inputs.inquiry);

        if (await validator.fails()) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let inquiry: Inquiry = new Inquiry;

        inquiry.user_id = inputs.inquiry.user_id;
        inquiry.car_id = inputs.inquiry.car_id;
        inquiry.pick_up_location_id = inputs.inquiry.pick_up_location_id;
        inquiry.drop_off_location_id = inputs.inquiry.drop_off_location_id;
        inquiry.pick_up_earliest_time = inputs.inquiry.pick_up_earliest_time;
        inquiry.drop_off_latest_time = inputs.inquiry.drop_off_latest_time;

        try {
            let createdInquiry: Inquiry = await inquiry.save();

            return await ApiController.respondWithData(ctx, createdInquiry);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }

    /**
     * Updates an inquiry.
     */
    public static async update(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty('inquiry') === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected inquiry, but none was given!");
        }

        if (inputs.inquiry.hasOwnProperty('id') === false || inputs.inquiry.id == "") {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected inquiry id, but none was given!"}]);
        }

        let validator: Validator = await ValidatorFactory.make();

        await validator.inquiryInvalid(inputs.inquiry);

        if (await validator.fails()) {
            return await ApiController.respondValidationFailed(ctx, validator.errors);
        }

        let inquiry = await Inquiry.findOne(inputs.inquiry.id);

        if (! inquiry) {
            return await ApiController.respondValidationFailed(ctx, [], "inquiry does not exists!");
        }

        inquiry.user_id = inputs.inquiry.user_id;
        inquiry.car_id = inputs.inquiry.car_id;
        inquiry.pick_up_location_id = inputs.inquiry.pick_up_location_id;
        inquiry.drop_off_location_id = inputs.inquiry.drop_off_location_id;
        inquiry.pick_up_earliest_time = inputs.inquiry.pick_up_earliest_time;
        inquiry.drop_off_latest_time = inputs.inquiry.drop_off_latest_time;
    
        try {
            let modifiedInquiry: Inquiry = await inquiry.save();

            return await ApiController.respondWithData(ctx, modifiedInquiry);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }

    /**
     * Deletes an inquiry.
     */
    public static async delete(ctx: any): Promise<any>
    {
        let inputs = ctx.request.body;

        if (inputs.hasOwnProperty("inquiry") === false || Object.keys(inputs).length === 0) {
            return await ApiController.respondValidationFailed(ctx, [], "expected inquiry, but none was given!");
        }

        if (inputs.inquiry.hasOwnProperty("id") === false) {
            return await ApiController.respondValidationFailed(ctx, [{"id": "expected inquiry id, but none was given!"}]);
        }

        try {
            let manager = getManager();
            let inquiry = await manager.delete(Inquiry, inputs.inquiry.id);
            
            return await ApiController.respondWithData(ctx, inquiry);
        } catch (err) {
            return await ApiController.respondWithError(ctx);
        }
    }
}
