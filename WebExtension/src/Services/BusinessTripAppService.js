var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ControllerBase, HttpMethods } from "@docsvision/webclient/System/ControllerBase";
var BusinessTripAppService = /** @class */ (function (_super) {
    __extends(BusinessTripAppService, _super);
    function BusinessTripAppService(services) {
        var _this = _super.call(this, services) || this;
        _this.services = services;
        _this.controllerName = "BusinessTripApp";
        return _this;
    }
    BusinessTripAppService.prototype.GetBusinessTripAppTraveller = function (model) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'GetBusinessTripAppTraveller',
            isApi: true,
            method: HttpMethods.Post,
            data: { model: model },
            options: { isShowOverlay: true }
        });
    };
    BusinessTripAppService.prototype.GetBusinessTripAppTotalAllowance = function (model) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'GetBusinessTripAppTotalAllowance',
            isApi: true,
            method: HttpMethods.Post,
            data: { model: model },
            options: { isShowOverlay: true }
        });
    };
    BusinessTripAppService.prototype.GetBusinessTripAppCreatedCardsCount = function (cardId) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'GetBusinessTripAppCreatedCardsCount',
            isApi: true,
            method: HttpMethods.Get,
            data: { cardId: cardId },
            options: { isShowOverlay: true }
        });
    };
    return BusinessTripAppService;
}(ControllerBase));
export { BusinessTripAppService };
//# sourceMappingURL=BusinessTripAppService.js.map