import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import {IBusinessTripAppTravellerRequestModel} from "../../Model/IBusinessTripAppTravellerRequestModel";
import {IBusinessTripAppTravellerModel} from "../../Model/IBusinessTripAppTravellerModel";

export interface IBusinessTripAppService {
    GetBusinessTripAppTraveller(model: IBusinessTripAppTravellerRequestModel): Promise<IBusinessTripAppTravellerModel>
}

export type $BusinessTripAppService = { businessTripAppService: IBusinessTripAppService};
export const $BusinessTripAppService = serviceName<$BusinessTripAppService, IBusinessTripAppService>(
        x => x.businessTripAppService
);