import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [MulterModule.register()],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
