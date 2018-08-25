
export class Validator 
{
    public static userInvalid(user: any) 
    {
        return isNaN(user.name) != true || 
                user.name == "" || 
                user.gender == "" || 
                isNaN(user.age);
    }
}