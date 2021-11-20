import { Controller, Get, Render } from "@nestjs/common";
// import { AppService } from "./app.service";

@Controller()
export class AppController {
    // constructor(private readonly appService: AppService) {}

    @Get()
    @Render("Index")
    index() {
        return {
            title: "Nest with Next",
        };
    }

    @Get("account")
    @Render("Account")
    account() {
        return {
            title: "Nest with Next",
        };
    }
}
