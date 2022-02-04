import { UserEntity } from "../../entities/user.entity";

export const authDto = ():UserEntity => {
    
    return {
        id: 1,
        firstName: "john",
        lastName: "doe",
        phone: "09025652652",
        email: "test@gmail.com",
        imagePath:"test.png"
    }
}