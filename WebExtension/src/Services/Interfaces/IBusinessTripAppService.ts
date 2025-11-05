import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import {IBusinessTripAppTravellerRequestModel} from "../../Model/IBusinessTripAppTravellerRequestModel";
import {IBusinessTripAppTravellerModel} from "../../Model/IBusinessTripAppTravellerModel";
import { IBusinessTripAppTotalAllowanceRequestModel } from "../../Model/IBusinessTripAppTotalAllowanceRequestModel";
import { IBusinessTripAppTotalAllowanceModel } from "../../Model/IBusinessTripAppTotalAllowanceModel";

export interface IBusinessTripAppService {
    GetBusinessTripAppTraveller(model: IBusinessTripAppTravellerRequestModel)
        : Promise<IBusinessTripAppTravellerModel>

    GetBusinessTripAppTotalAllowance(model: IBusinessTripAppTotalAllowanceRequestModel)
        : Promise<IBusinessTripAppTotalAllowanceModel>
}

export type $BusinessTripAppService = { businessTripAppService: IBusinessTripAppService};
export const $BusinessTripAppService = serviceName<$BusinessTripAppService, IBusinessTripAppService>(
        x => x.businessTripAppService
);