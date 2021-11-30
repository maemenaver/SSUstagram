import { Injectable } from "@nestjs/common";
import { RenderableResponse } from "nest-next";
import { AuthStatus } from "./api/user/user.types";

@Injectable()
export class AppService {
    routeIndex(authStatus: AuthStatus, res: RenderableResponse) {
        if (authStatus.isEmailVerified) {
            return res.render("Home", {
                title: "test",
            });
        }

        return res.render("Index", {
            ...authStatus,
        } as any);
    }
}
