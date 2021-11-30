import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import axiosInstance from "../../../pages/lib/axiosInstance";
import { getBearerToken } from "../../lib/token";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserFindOneDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { AuthStatus } from "./user.types";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    getAuthStatus(user: User): AuthStatus {
        return {
            isAuth: !!user,
            isEmailVerified: user
                ? user.roles.some((v) => v === "EmailVerified")
                : false,
            email: user?.email,
        };
    }

    getUserByHttp(req): Promise<User> {
        return axiosInstance()
            .get("http://127.0.0.1:8053/api/user", {
                headers: {
                    authorization: getBearerToken(req),
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
