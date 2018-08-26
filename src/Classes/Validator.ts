
export class Validator 
{
    /**
     * Stores the input errors.
     */
    public errors: Array<object> = [];

    /**
     * Validates the user's inputs.
     */
    public userInvalid(user: any) 
    {
        let genders: object = {
            male: "male",
            female: "female"
        }

        if (isNaN(user.name) != true) {
            this.errors.push({
                name: "name must be a string!"
            });
        } 
        
        if (user.hasOwnProperty('name') && user.name == "") {
            this.errors.push({
                name: "name cannot be empty!"
            });
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

        if (isNaN(user.age)) {
            this.errors.push({
                age: "age must be number!"
            }); 
        }
    }

    /**
     * Validates the user's car inputs.
     */
    public carInvalid(car: any): Promise<this>
    {
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

        if (car.hasOwnProperty('model')) {
            if (models.hasOwnProperty(car.model) === false) {
                this.errors.push({
                    model: "unknown car model! bmw-x or bmw-x6 ?"
                });
            }
        } else {
            this.errors.push({
                model: "car model is required!"
            })
        }

        if (car.hasOwnProperty('engine')) {
            if (engines.hasOwnProperty(car.engine) === false) {
                this.errors.push({
                    engine: "unknown car engine! 4-cylinder, 6-cylinder, 8-cylinder or 12-cylinder ?"
                });
            }
        } else {
            this.errors.push({
                engine: "car engine is required!"
            })
        }

        if (car.hasOwnProperty('infotainment_system')) {
            if (infotainmentSystems.hasOwnProperty(car.infotainment_system) === false) {
                this.errors.push({
                    infotainment_system: "unknown car infotainment system! tv, radio or navigation ?"
                });
            }
        } else {
            this.errors.push({
                infotainment_system: "car infotainment system engine is required!"
            })
        }

        if (car.hasOwnProperty('interior_design')) {
            if (interiorDesigns.hasOwnProperty(car.interior_design) === false) {
                this.errors.push({
                    interior_design: "unknown car interior design! leather, carbon or comfort ?"
                });
            }
        } else {
            this.errors.push({
                interior_design: "car interior design engine is required!"
            });
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
        } else {
            this.errors.push({
                coordinate_x: "car coordinate x is required!"
            });
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
        } else {
            this.errors.push({
                coordinate_y: "car coordinate y is required!"
            });
        }

        return Promise.resolve(this);
    }

    /**
     * Validates the user's inquiry inputs.
     */
    public inquiryInvalid(inquiry: any): Promise<this>
    {


        return Promise.resolve(this)
    }

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