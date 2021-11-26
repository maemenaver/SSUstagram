import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async signUp(userArg: CreateUserDto) {
        try {
            const { id, email } = userArg;

            const isAlreadyRegisted =
                (await this.userRepository.findOne({ id })) ||
                (await this.userRepository.findOne({ email }));

            // 유저가 이미 존재하는가?
            if (isAlreadyRegisted) {
                throw new HttpException(
                    "User already exist",
                    HttpStatus.CONFLICT
                );
            }

            const user = {
                ...new User(),
                ...userArg,
                password: await bcrypt.hash(userArg.password, 10),
            };

            await this.userRepository.save(user);
            return user;
        } catch (err) {
            throw err;
        }
    }

    create(createAuthDto: CreateAuthDto) {
        return "This action adds a new auth";
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
