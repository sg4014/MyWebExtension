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
import { ApplicationBusinessTripLogic } from "../Logic/ApplicationBusinessTripLogic";
export function ddApplicationBusinessTrip_beforeCardSaving(layout, args) {
    return __awaiter(this, void 0, void 0, function () {
        var logic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!layout) {
                        return [2 /*return*/];
                    }
                    logic = new ApplicationBusinessTripLogic();
                    args.wait();
                    return [4 /*yield*/, logic.validateThatNameNotEmpty(layout)];
                case 1: return [2 /*return*/, (_a.sent())
                        ? args.accept()
                        : args.cancel()];
            }
        });
    });
}
export function ddApplicationBusinessTrip_tripDateChange(sender, args) {
    return __awaiter(this, void 0, void 0, function () {
        var logic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sender) {
                        return [2 /*return*/];
                    }
                    logic = new ApplicationBusinessTripLogic();
                    return [4 /*yield*/, logic.validateThatTripEndsAfterTripStarts(sender, args)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, logic.updateDaysInTripOnDatesChanged(sender.layout)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function ddApplicationBusinessTrip_buttonInfo_click(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var logic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sender) {
                        return [2 /*return*/];
                    }
                    logic = new ApplicationBusinessTripLogic();
                    return [4 /*yield*/, logic.displayCardInfo(sender)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function ddApplicationBusinessTrip_traveller_onDataChanged(sender, args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sender) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, new ApplicationBusinessTripLogic().fillExecutiveAndPhone(sender.layout, args)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function ddApplicationBusinessTrip_city_onDataChanged(sender, args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sender) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, new ApplicationBusinessTripLogic().fillAllowance(sender.layout, args)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function ddApplicationBusinessTrip_daysInTripCount_onDataChanged(sender, args) {
    return __awaiter(this, void 0, void 0, function () {
        var logic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sender) {
                        return [2 /*return*/];
                    }
                    logic = new ApplicationBusinessTripLogic();
                    return [4 /*yield*/, logic.fillAllowanceOnDaysChanged(sender.layout, args)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, logic.updateTripEndDateOnDaysChanged(sender.layout, args)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getAppCount_onClick(sender, args) {
    return __awaiter(this, void 0, void 0, function () {
        var services, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    services = sender.layout.getService();
                    return [4 /*yield*/, new ApplicationBusinessTripLogic().getAppCount(sender.layout)];
                case 1:
                    count = _a.sent();
                    services.messageBox.showInfo("Found ".concat(count, " applications"));
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=ApplicationBusinessTripHandlers.js.map