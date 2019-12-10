import { ExpressMiddlewareInterface } from "routing-controllers";
import { addLog } from "../services/FireStoreService";

export class SystemLogger implements ExpressMiddlewareInterface {
  constructor() {}

  use(req: any, res: Response, next: () => any): void {
    //const { id, name } = req.user;
    const url = req.url;
    addLog(3, "관리자", url);

    next();
  }
}
