import { Request, Response} from "express";
import { ListUserReceivedComplimentsService} from "../services/ListUserReceivedComplimentsService"


class ListUserReceivedComplimentsController {


    async handle(request: Request, response: Response) {
        const { user_id } = request.body;

        const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService();

        const compliments = listUserReceivedComplimentsService.execute(user_id)
    
        return response.json(compliments);
    }
}

export { ListUserReceivedComplimentsController }