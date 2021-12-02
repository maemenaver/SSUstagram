import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { findAllArgDto } from "./dto/board.dto";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {}

    async create(userID: string, createBoardDto: CreateBoardDto) {
        try {
            const content = createBoardDto.content;
            const hashtag = [];

            content.replaceAll("\\#([0-9a-zA-Z가-힣]*)", (tag) => {
                tag = tag.replace("-_+=!@#$%^&*()[]{}|\\;:'\"<>,.?/~`） ", "");
                hashtag.push(tag);
                return tag;
            });

            const board: Board = {
                ...new Board(),
                ...createBoardDto,
                authorID: userID,
                hashtag,
            };

            await this.boardRepository.save(board);

            return board;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    findAll(args?: findAllArgDto) {
        return this.boardRepository.find({
            ...args,
            order: {
                createdAt: "DESC",
            },
        });
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
