import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({name, email, admin = false, password} : IUserRequest) {
       const usersRepository = getCustomRepository(UsersRepositories);

       if(!name) {
           throw new Error("Por gentileza, preencha corretamente o nome de usuario!")
       }

       if(!email) {
           throw new Error("Por gentileza, preencha corretamente o email corretamente!")
       }

       if(!password) {
        throw new Error("Por gentileza, forneça uma senha!")
       }

       const userAlreadyExistis = await usersRepository.findOne({
           email
       });

       if(userAlreadyExistis) {
           throw new Error("Email ja cadastrado!");
       }

       const passwordHash = await hash(password, 8);

       const user = usersRepository.create({
           name,
           email,
           admin,
           password: passwordHash,
       });

       await usersRepository.save(user);

       return user;
    }
}

export { CreateUserService };