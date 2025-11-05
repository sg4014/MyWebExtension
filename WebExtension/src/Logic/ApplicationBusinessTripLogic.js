var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { $BusinessTripAppService } from "../Services/Interfaces/IBusinessTripAppService";
import { $EmployeeController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
var ApplicationBusinessTripLogic = /** @class */ (function () {
    function ApplicationBusinessTripLogic() {
    }
    ApplicationBusinessTripLogic.prototype.validateThatNameNotEmpty = function (layout) {
        return __awaiter(this, void 0, void 0, function () {
            var nameControl, nameControlText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameControl = layout.controls.tryGet("name");
                        if (!!nameControl) return [3 /*break*/, 2];
                        return [4 /*yield*/, MessageBox.ShowError("Элемент управления name отсутствует в разметке!")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 2:
                        nameControlText = nameControl.params.value;
                        if (!(!nameControlText || nameControlText.trim().length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, MessageBox.ShowWarning('Поле "Название" не заполнено!')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.validateThatTripEndsAfterTripStarts = function (sender, args) {
        return __awaiter(this, void 0, void 0, function () {
            var tripDateStartControl, tripDateEndControl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tripDateStartControl = sender.layout.controls.tryGet("tripDateStart");
                        if (!!tripDateStartControl) return [3 /*break*/, 2];
                        return [4 /*yield*/, MessageBox.ShowError("Элемент управления tripDateStart отсутствует в разметке!")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        tripDateEndControl = sender.layout.controls.tryGet("tripDateEnd");
                        if (!!tripDateEndControl) return [3 /*break*/, 4];
                        return [4 /*yield*/, MessageBox.ShowError("Элемент управления tripDateEnd отсутствует в разметке!")];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        if (!(tripDateEndControl.params.value < tripDateStartControl.params.value)) return [3 /*break*/, 6];
                        return [4 /*yield*/, MessageBox.ShowWarning("Дата начала командировки не может быть позже даты конца командировки!")];
                    case 5:
                        _a.sent();
                        sender.params.value = args.oldValue;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.displayCardInfo = function (sender) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __awaiter(this, void 0, void 0, function () {
            var controls, nameControl, creationDateControl, tripDateStartControl, tripDateEndControl, tripReasonControl, cityControl;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        controls = sender.layout.controls;
                        nameControl = controls.tryGet("name");
                        creationDateControl = controls.tryGet("creationDate");
                        tripDateStartControl = controls.tryGet("tripDateStart");
                        tripDateEndControl = controls.tryGet("tripDateEnd");
                        tripReasonControl = controls.tryGet("tripReason");
                        cityControl = controls.tryGet("city");
                        return [4 /*yield*/, MessageBox.ShowInfo("\n\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435: ".concat((_b = (_a = nameControl === null || nameControl === void 0 ? void 0 : nameControl.params) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '', ",\n\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: ").concat((_d = (_c = creationDateControl === null || creationDateControl === void 0 ? void 0 : creationDateControl.params) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '', ",\n\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0438\u0440\u043E\u0432\u043A\u0438: ").concat((_f = (_e = tripDateStartControl === null || tripDateStartControl === void 0 ? void 0 : tripDateStartControl.params) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '', ",\n\u0414\u0430\u0442\u0430 \u043A\u043E\u043D\u0446\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0438\u0440\u043E\u0432\u043A\u0438: ").concat((_h = (_g = tripDateEndControl === null || tripDateEndControl === void 0 ? void 0 : tripDateEndControl.params) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '', ",\n\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0435\u0437\u0434\u043A\u0438: ").concat((_k = (_j = tripReasonControl === null || tripReasonControl === void 0 ? void 0 : tripReasonControl.params) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : '', ",\n\u0413\u043E\u0440\u043E\u0434: ").concat((_o = (_m = (_l = cityControl === null || cityControl === void 0 ? void 0 : cityControl.params) === null || _l === void 0 ? void 0 : _l.value) === null || _m === void 0 ? void 0 : _m.name) !== null && _o !== void 0 ? _o : '', "\n        "))];
                    case 1:
                        _p.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.fillExecutiveAndPhone = function (layout, args) {
        return __awaiter(this, void 0, void 0, function () {
            var travellerModel, executiveControl, phoneControl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, layout.getService($BusinessTripAppService)
                            .GetBusinessTripAppTraveller({ travellerId: args.newValue.id })];
                    case 1:
                        travellerModel = _b.sent();
                        if (!travellerModel) {
                            console.log("Couldn't extract traveller model");
                            console.log("args: ".concat(args));
                            return [2 /*return*/];
                        }
                        executiveControl = layout.controls.tryGet("executive");
                        phoneControl = layout.controls.tryGet("phone");
                        _a = executiveControl.params;
                        return [4 /*yield*/, layout.getService($EmployeeController).getEmployee(travellerModel.executiveId)];
                    case 2:
                        _a.value = _b.sent();
                        phoneControl.params.value = travellerModel.phone;
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.fillAllowance = function (layout, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var daysInTripControl, TotalAllowanceModel, allowanceControl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        daysInTripControl = layout.controls.tryGet("daysInTripCount");
                        if (!!daysInTripControl) return [3 /*break*/, 2];
                        return [4 /*yield*/, MessageBox.ShowError("Элемент управления daysInTripControl отсутствует в разметке!")];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, layout.getService($BusinessTripAppService)
                            .GetBusinessTripAppTotalAllowance({
                            city: args.newValue.name,
                            daysInTrip: (_a = daysInTripControl.params.value) !== null && _a !== void 0 ? _a : 0
                        })];
                    case 3:
                        TotalAllowanceModel = _b.sent();
                        return [4 /*yield*/, layout.controls.tryGet("allowance")];
                    case 4:
                        allowanceControl = _b.sent();
                        allowanceControl.params.value = TotalAllowanceModel.totalAllowance;
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.fillAllowanceOnDaysChanged = function (layout, args) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var cityControl, cityName, TotalAllowanceModel, allowanceControl;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        cityControl = layout.controls.tryGet("city");
                        cityName = (_b = (_a = cityControl === null || cityControl === void 0 ? void 0 : cityControl.params) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.name;
                        if (!cityName) {
                            // city is not set yet, so allowance can't be calculated
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, layout.getService($BusinessTripAppService)
                                .GetBusinessTripAppTotalAllowance({
                                city: cityName,
                                daysInTrip: (_c = args.newValue) !== null && _c !== void 0 ? _c : 0
                            })];
                    case 1:
                        TotalAllowanceModel = _d.sent();
                        return [4 /*yield*/, layout.controls.tryGet("allowance")];
                    case 2:
                        allowanceControl = _d.sent();
                        allowanceControl.params.value = TotalAllowanceModel.totalAllowance;
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.updateDaysInTripOnDatesChanged = function (layout) {
        return __awaiter(this, void 0, void 0, function () {
            var tripDateStartControl, tripDateEndControl, startDate, endDate, daysInTripCountControl;
            return __generator(this, function (_a) {
                tripDateStartControl = layout.controls.tryGet("tripDateStart");
                tripDateEndControl = layout.controls.tryGet("tripDateEnd");
                startDate = new Date(tripDateStartControl.params.value);
                endDate = new Date(tripDateEndControl.params.value);
                daysInTripCountControl = layout.controls.tryGet("daysInTripCount");
                daysInTripCountControl.params.value = this.getDifferenceInDays(startDate, endDate);
                return [2 /*return*/];
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.updateTripEndDateOnDaysChanged = function (layout, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tripDateStartControl, tripDateEndControl, tripStart;
            return __generator(this, function (_b) {
                tripDateStartControl = layout.controls.tryGet("tripDateStart");
                if (!((_a = tripDateStartControl === null || tripDateStartControl === void 0 ? void 0 : tripDateStartControl.params) === null || _a === void 0 ? void 0 : _a.value)) {
                    MessageBox.ShowWarning("Сначала установите дату начала командировки");
                    return [2 /*return*/];
                }
                tripDateEndControl = layout.controls.tryGet("tripDateEnd");
                tripStart = new Date(tripDateStartControl.params.value);
                tripDateEndControl.params.value = new Date(tripStart.setDate(tripStart.getDate() + args.newValue));
                return [2 /*return*/];
            });
        });
    };
    ApplicationBusinessTripLogic.prototype.getDifferenceInDays = function (date1, date2) {
        var msInDay = 1000 * 60 * 60 * 24;
        var diffInMs = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(diffInMs / msInDay);
    };
    ApplicationBusinessTripLogic.prototype.dateToDays = function (date) {
        var msInDay = 1000 * 60 * 60 * 24;
        return Math.floor(date.getTime() / msInDay);
    };
    ApplicationBusinessTripLogic.prototype.daysToDate = function (days) {
        var msInDay = 1000 * 60 * 60 * 24;
        return new Date(days * msInDay);
    };
    return ApplicationBusinessTripLogic;
}());
export { ApplicationBusinessTripLogic };
//# sourceMappingURL=ApplicationBusinessTripLogic.js.map