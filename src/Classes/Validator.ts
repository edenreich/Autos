import { User } from '../Models/User';
import { Car } from '../Models/Car';
import { Location } from '../Models/Location';

export class Validator 
{
    /**
     * Stores the input errors.
     */
    public errors: Array<any> = [];

    protected requiredUserAttributes: Array<string> = [
        'name', 'age'
    ];

    protected requiredCarAttributes: Array<string> = [
        'location_id', 'model', 'engine', 
        'infotainment_system', 'interior_design',
        'coordinate_x', 'coordinate_y'
    ];

    protected requiredInquiryAttributes: Array<string> = [
        'user_id', 'car_id', 
        'pick_up_location_id', 'drop_off_location_id',
        'pick_up_earliest_time', 'drop_off_latest_time'
    ];

    protected requiredLocationAttributes: Array<string> = [
        'name', 'street', 
        'zip', 'tel'
    ];

    /**
     * Validates the user's inputs.
     */
    public userInvalid(user: any) 
    {
        this.requiredUserAttributes.forEach((requiredAttribute: any) => {
            if (user.hasOwnProperty(requiredAttribute) === false) {
                let error: any = {};
                error[requiredAttribute] = `${requiredAttribute} is required!`;
                this.errors.push(error);          
            }
        });

        let genders: object = {
            male: "male",
            female: "female"
        }
        
        if (user.hasOwnProperty('name')) {
            if (user.name == "") {
                this.errors.push({
                    name: "name cannot be empty!"
                });
            }

            if (isNaN(user.name) != true) {
                this.errors.push({
                    name: "name must be a string!"
                });
            }
        }
        
        if (user.hasOwnProperty('gender')) {
            if (user.gender == "") {
                this.errors.push({
                    gender: "gender cannot be empty!"
                }); 
            }

            if (genders.hasOwnProperty(user.gender) === false) {
                this.errors.push({
                    gender: "unknown gender, please specify male or female!"
                }); 
            }
        }

        if (user.hasOwnProperty('age')) {
            if (isNaN(user.age)) {
                this.errors.push({
                    age: "age must be number!"
                });
            }

            if (user.age < 18) {
                this.errors.push({
                    age: "user must be at least 18 with driven license to register!"
                });
            }
        }


    }

    /**
     * Validates the user's car inputs.
     */
    public carInvalid(car: any): Promise<this>
    {
        this.requiredCarAttributes.forEach((requiredAttribute: any) => {
            if (car.hasOwnProperty(requiredAttribute) === false) {
                let error: any = {};
                error[requiredAttribute] = `${requiredAttribute} is required!`;
                this.errors.push(error);          
            }
        });

        let models: any = {
            'bmw-x': 'bmw-x', 
            'bmw-x6': 'bmw-x6',
        };

        let engines: any = {
            '4-cylinder': '4-cylinder', 
            '6-cylinder': '6-cylinder', 
            '8-cylinder': '8-cylinder', 
            '12-cylinder': '12-cylinder'
        };

        let infotainmentSystems: any = {
            'tv': 'tv', 
            'radio': 'radio', 
            'navigation': 'navigation',
        };

        let interiorDesigns: any = {
            'leather': 'leather', 
            'carbon': 'carbon', 
            'comfort': 'comfort',
        };

        if (car.hasOwnProperty('location_id')) {
            if (isNaN(car.location_id)) {
                this.errors.push({
                    model: "location_id must be a number"
                });
            }
        }

        if (car.hasOwnProperty('model')) {
            if (models.hasOwnProperty(car.model) === false) {
                this.errors.push({
                    model: "unknown car model! bmw-x or bmw-x6 ?"
                });
            }
        }

        if (car.hasOwnProperty('engine')) {
            if (engines.hasOwnProperty(car.engine) === false) {
                this.errors.push({
                    engine: "unknown car engine! 4-cylinder, 6-cylinder, 8-cylinder or 12-cylinder ?"
                });
            }
        }

        if (car.hasOwnProperty('infotainment_system')) {
            if (infotainmentSystems.hasOwnProperty(car.infotainment_system) === false) {
                this.errors.push({
                    infotainment_system: "unknown car infotainment system! tv, radio or navigation ?"
                });
            }
        }

        if (car.hasOwnProperty('interior_design')) {
            if (interiorDesigns.hasOwnProperty(car.interior_design) === false) {
                this.errors.push({
                    interior_design: "unknown car interior design! leather, carbon or comfort ?"
                });
            }
        }

        if (car.hasOwnProperty('coordinate_x')) {
            if (isNaN(car.coordinate_x)) {
                this.errors.push({
                    coordinate_x: "coordinate_x must be a number!"
                });
            }

            if (car.coordinate_x == "") {
                this.errors.push({
                    coordinate_x: "coordinate_x cannot be empty!"
                }); 
            }
        }

        if (car.hasOwnProperty('coordinate_y')) {
            if (isNaN(car.coordinate_y)) {
                this.errors.push({
                    coordinate_y: "coordinate_y must be a number!"
                });
            }

            if (car.coordinate_y == "") {
                this.errors.push({
                    coordinate_y: "coordinate_y cannot be empty!"
                }); 
            }
        }

        return Promise.resolve(this);
    }

    /**
     * Validates the user's inquiry inputs.
     */
    public async inquiryInvalid(inquiry: any): Promise<this>
    {
        this.requiredInquiryAttributes.forEach((requiredAttribute: any) => {
            if (inquiry.hasOwnProperty(requiredAttribute) === false) {
                let error: any = {};
                error[requiredAttribute] = `${requiredAttribute} is required!`;
                this.errors.push(error);          
            }
        });

        if (inquiry.hasOwnProperty('user_id')) {
            if (isNaN(inquiry.user_id)) {
                this.errors.push({"user_id": "user_id must be a number!"});
            }
            
            if (isNaN(inquiry.user_id) === false) { 
                let user = await User.findOne(inquiry.user_id);
                
                if (! user) {
                    this.errors.push({"user_id": "user does not exists!"});
                }
            }
        }

        if (inquiry.hasOwnProperty('car_id')) {
            if (isNaN(inquiry.car_id)) {
                this.errors.push({"car_id": "car_id must be a number!"});
            }

            if (isNaN(inquiry.car_id) === false) {
                let car = await Car.findOne(inquiry.car_id);
                
                if (! car) {
                    this.errors.push({"car_id": "car does not exists!"});
                }
            }
        }

        if (inquiry.hasOwnProperty('pick_up_location_id')) {
            if (isNaN(inquiry.pick_up_location_id)) {
                this.errors.push({"pick_up_location_id": "pick_up_location_id must be a number!"});
            }

            if (isNaN(inquiry.pick_up_location_id) === false) { 
                let location: Location | undefined = await Location.findOne(inquiry.pick_up_location_id);
                
                if (! location) {
                    this.errors.push({"pick_up_location_id": "location does not exists!"});
                }
            }
        }

        if (inquiry.hasOwnProperty('drop_off_location_id')) {
            if (isNaN(inquiry.drop_off_location_id)) {
                this.errors.push({"drop_off_location_id": "drop_off_location_id must be a number!"});
            }

            if (isNaN(inquiry.drop_off_location_id) === false) { 
                let location: Location | undefined = await Location.findOne(inquiry.drop_off_location_id);
                
                if (! location) {
                    this.errors.push({"drop_off_location_id": "location does not exists!"});
                }
            }
        }

        return Promise.resolve(this);
    }

    /**
     * Validates the user location inputs.
     */
    public locationInvalid(location: any): Promise<this>
    {
        this.requiredLocationAttributes.forEach((requiredAttribute: any) => {
            if (location.hasOwnProperty(requiredAttribute) === false) {
                let error: any = {};
                error[requiredAttribute] = `${requiredAttribute} is required!`;
                this.errors.push(error);          
            }
        });

        return Promise.resolve(this);
    }

    /**
     * Indicates if the validator fails.
     */
    public fails()
    {
        return Promise.resolve(this.errors.length ? true : false);
    }
}

export class ValidatorFactory 
{
    public static make(): Promise<Validator>
    {
        return Promise.resolve(new Validator);
    }
}