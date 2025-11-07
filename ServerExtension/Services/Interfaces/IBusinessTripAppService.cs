using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.WebClient;
using MyDVExtension.Server.Model;
using System;
using System.Collections.Generic;

namespace MyDVExtension.Server.Services.Interfaces;

public interface IBusinessTripAppService {
	BusinessTripAppTravellerModel GetBusinessTripAppTravellerModel(
        SessionContext sessionContext, Guid travellerId);

    BusinessTripAppTotalAllowanceModel GetBusinessTripAppTotalAllowanceModel(
        SessionContext sessionContext, string city, int daysInTrip);

    void InitCard(SessionContext sessionContext, Guid cardId);

    public int GetUserCreatedApplicationCardsCount(SessionContext sessionContext, Guid cardId);

    public InfoRowCollection GetEmployeeTripHistory(SessionContext sessionContext, Guid travellerId);
}