import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { User } from "../user/entities/user.entity";

@Module({
    imports: [MulterModule.register(), TypeOrmModule.forFeature([Board, User])],
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService],
})
export class BoardModule {}
