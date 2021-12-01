import { Module } from "@nestjs/common";
import { RenderModule } from "nest-next";
import Next from "next";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApiModule } from "./api/api.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { User } from "./api/user/entities/user.entity";
import { EmailVerification } from "./api/auth/entities/EmailVerification.entity";
import { UserModule } from "./api/user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        RenderModule.forRootAsync(
            Next({
                dev:
                    // process.env.NODE_ENV !== "production"
                    true,
            })
        ),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            synchronize: true,
            charset: "utf8mb4_unicode_ci",
            entities: [User, EmailVerification],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "..", "..", "public"),
        }),
        ApiModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    // constructor() {}
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(
    //         session({
    //             store: new TypeormStore({
    //                 cleanupLimit: 2,
    //                 limitSubquery: false, // If using MariaDB.
    //                 ttl: 86400,
    //             }).connect(repository),
    //             secret: "e5d7sF0h)Hgt7^RF5de",
    //         })
    //     );
    // }
}
