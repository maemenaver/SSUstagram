import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserFindOneDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    create(createUserDto: CreateUserDto) {
        try {
            const user = { ...new User(), ...createUserDto };
            return this.userRepository.save(user);
        } catch (err) {
            throw err;
        }
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(args: UserFindOneDto) {
        try {
            return this.userRepository.findOne({ where: args });
        } catch (err) {
            throw err;
        }
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
