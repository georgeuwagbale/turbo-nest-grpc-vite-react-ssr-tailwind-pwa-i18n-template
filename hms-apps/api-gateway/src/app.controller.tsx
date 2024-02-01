import { Controller, Get, Req, Res, Version } from '@nestjs/common';
import { AppService } from './app.service';
import DisplayUsers from '../../users-demo-frontend/src/components/DisplayUsers';
import { initialContentMap as iCM } from './global/backend.settings';
import { assetMap as aM } from './global/backend.settings';
import { RequestExtended as Request } from './global/app.interfaces';
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Response } from 'express';
import { UsersService } from './users/users.service';
import React from "react";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UsersService) {}

    //Prepare for ssr for this controller from global settings
  //below, feel free to add more data fields as your logic requires, to the initialContentMap below
  //you can also do this at Request level.
  initialContentMap = { ...iCM, 'title': 'Welcome to demo Hello World!' }
  assetMap = { ...aM, initialContentMap: this.initialContentMap }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('web*')
  @Version('1')
  geUsers(@Req() req: Request, @Res() res: Response) {
    let assetMap = {
      ...this.assetMap,
      baseUrl: "/v1/web",
      initialContentMap: { ...this.initialContentMap, 'hello-message': this.appService.getHello() }
    }

    const entryPoint = [assetMap['main.js']];

    const users = this.userService.findAll();
    users.subscribe((data) => {
      
      const { pipe, abort: _abort } = renderToPipeableStream(
        <StaticRouter location={req.url}>
          <DisplayUsers data={data.users}  />
        </StaticRouter>,
        {
          bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`, 
          bootstrapModules: entryPoint,
          onShellReady() {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            pipe(res);
          },
          onShellError() {
            res.statusCode = 500;
            res.send("<!doctype html><p>Loading...</p>");
          },
        }
      );
   

    });

       
  }
}
