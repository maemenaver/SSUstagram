import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";

@Injectable()
export class BoardService {
    create(createBoardDto: CreateBoardDto) {
        const board = new Board();
    }

    findAll() {
        return `This action returns all board`;
    }

    findOne(id: number) {
        return `This action returns a #${id} board`;
    }

    update(id: number, updateBoardDto: UpdateBoardDto) {
        return `This action updates a #${id} board`;
    }

    remove(id: number) {
        return `This action removes a #${id} board`;
    }
}
