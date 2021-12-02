import { Injectable } from "@nestjs/common";
import { RenderableResponse } from "nest-next";
import { BoardService } from "./api/board/board.service";
import { AuthStatus } from "./api/user/user.types";

@Injectable()
export class AppService {
    constructor(private readonly boardService: BoardService) {}

    async routeIndex(authStatus: AuthStatus, res: RenderableResponse) {
        if (authStatus.isEmailVerified) {
            const board = await this.boardService.findAll();

            return res.render("home", {
                board,
            } as any);
        }

        return res.render("index", {
            ...authStatus,
        } as any);
    }
}
