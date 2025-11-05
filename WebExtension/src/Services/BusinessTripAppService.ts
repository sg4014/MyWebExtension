import {ControllerBase, HttpMethods} from "@docsvision/webclient/System/ControllerBase";
import {IBusinessTripAppService} from "./Interfaces/IBusinessTripAppService";
import {$RequestManager} from "@docsvision/webclient/System/$RequestManager";
import {IBusinessTripAppTravellerRequestModel} from "../Model/IBusinessTripAppTravellerRequestModel";
import {IBusinessTripAppTravellerModel} from "../Model/IBusinessTripAppTravellerModel";
import { IBusinessTripAppTotalAllowanceModel } from "../Model/IBusinessTripAppTotalAllowanceModel";
import { IBusinessTripAppTotalAllowanceRequestModel } from "../Model/IBusinessTripAppTotalAllowanceRequestModel";


export class BusinessTripAppService extends ControllerBase implements IBusinessTripAppService {
    
    protected controllerName: string = "BusinessTripApp";
    
    constructor(protected services: $RequestManager) {
        super(services);
    }

    GetBusinessTripAppTraveller(model: IBusinessTripAppTravellerRequestModel)
        : Promise<IBusinessTripAppTravellerModel> {
        
        return super.doRequest({
            controller: this.controllerName,
            action: 'GetBusinessTripAppTraveller',
            isApi: true,
            method: HttpMethods.Post,
            data: { model },
            options: { isShowOverlay: true }
        });
    }

    GetBusinessTripAppTotalAllowance(model: IBusinessTripAppTotalAllowanceRequestModel)
        : Promise<IBusinessTripAppTotalAllowanceModel> {

        return super.doRequest({
            controller: this.controllerName,
            action: 'GetBusinessTripAppTotalAllowance',
            isApi: true,
            method: HttpMethods.Post,
            data: { model },
            options: { isShowOverlay: true }
        });
    }
}