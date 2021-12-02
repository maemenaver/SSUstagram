import { Controller, Get, Render, Request, Response } from "@nestjs/common";
import { RenderableResponse } from "nest-next";
import { BoardService } from "./api/board/board.service";
import { UserService } from "./api/user/user.service";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService
    ) {}

    @Get()
    async index(
        @Request() req,
        @Response({ passthrough: true }) res: RenderableResponse
    ) {
        try {
            const user = await this.userService.getUserByHttp(req);

            const authStatus = this.userService.getAuthStatus(user);
            return this.appService.routeIndex(authStatus, res);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Get("account")
    @Render("account")
    account(@Request() req) {
        return {
            title: "Test",
        };
    }

    @Get("profile")
    async profile(
        @Request() req,
        @Response({ passthrough: true }) res: RenderableResponse
    ) {
        const user = await this.userService.getUserByHttp(req);
        const authStatus = this.userService.getAuthStatus(user);

        if (!authStatus.isAuth) {
            return this.appService.routeIndex(authStatus, res);
        }

        return res.render("profile", {
            username: user.id,
        });
    }

    @Get("home")
    async home(
        @Request() req,
        @Response({ passthrough: true }) res: RenderableResponse
    ) {
        const user = await this.userService.getUserByHttp(req);
        const authStatus = this.userService.getAuthStatus(user);

        return this.appService.routeIndex(authStatus, res);
    }

    @Get("new")
    async new(
        @Request() req,
        @Response({ passthrough: true }) res: RenderableResponse
    ) {
        const user = await this.userService.getUserByHttp(req);
        const authStatus = this.userService.getAuthStatus(user);

        if (!authStatus.isAuth) {
            return this.appService.routeIndex(authStatus, res);
        }

        return res.render("new", {
            // title: "Nest with Next",
        });
    }
}
