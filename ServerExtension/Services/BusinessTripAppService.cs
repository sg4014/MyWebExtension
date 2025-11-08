using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.StorageServer;
using DocsVision.Platform.WebClient;
using Microsoft.Extensions.DependencyInjection;
using MyDVExtension.Server.Model;
using MyDVExtension.Server.Services.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace MyDVExtension.Server.Services;

public class BusinessTripAppService : IBusinessTripAppService {

	public BusinessTripAppTravellerModel GetBusinessTripAppTravellerModel(SessionContext sessionContext, Guid travellerId) {
		var staffSvc = sessionContext.ObjectContext.GetService<IStaffService>();
		var traveller = staffSvc.Get(travellerId)
		           ?? throw new InvalidOperationException("Traveller with the given id doesn't exist");
		
		return new BusinessTripAppTravellerModel {
			Id = traveller.GetObjectId(),
			ExecutiveId = staffSvc.GetEmployeeManager(traveller).GetObjectId(),
			Phone = traveller.Phone
		};
	}

	public BusinessTripAppTotalAllowanceModel GetBusinessTripAppTotalAllowanceModel(
		SessionContext sessionContext, string city, int daysInTrip)
	{
		var baseUniversalSvc = sessionContext.ObjectContext.GetService<IBaseUniversalService>();
		var citiesNode = baseUniversalSvc.FindItemTypeWithSameName("Города", null);
		var cityRow = baseUniversalSvc.FindItemWithSameName(city, citiesNode);
		var totalAllowance = daysInTrip * (decimal)cityRow.ItemCard.MainInfo["DailyAllowance"];

		return new BusinessTripAppTotalAllowanceModel{ TotalAllowance = totalAllowance};
	}

    public void InitCard(SessionContext sessionContext, Guid cardId)
	{
        var staffSvc = sessionContext.ObjectContext.GetService<IStaffService>();
        var traveller = staffSvc.GetCurrentEmployee();
        var executive = staffSvc.GetEmployeeManager(traveller);

        var card = sessionContext.ObjectContext.GetObject<Document>(cardId);
        if (card is null)
        {
            throw new InvalidOperationException("Card is null!");
        }
        var row = GetBusinessTripRequestSectionRow(card);

        row["Traveller"] = traveller.GetObjectId();
        row["Executive"] = executive.GetObjectId();
        row["Phone"] = traveller.Phone;

        var secretaries = staffSvc.FindGroupByName(null, "Секретарь");
        var secretary = staffSvc.GetGroupEmployees(secretaries, true, false, true).FirstOrDefault();
        row["Formalizer"] = secretary.GetObjectId();

        var approversRows = (IList<BaseCardSectionRow>)card.GetSection(CardDocument.Approvers.ID);
        var newApproversRow = new BaseCardSectionRow();

        if (traveller.Unit?.Manager == traveller)
        {
            // traveller is the department manager, so approver must be the CEO
            newApproversRow[CardDocument.Approvers.Approver] = GetRootUnit(traveller.Unit)?.Manager?.GetObjectId();
        } else
        {
            // traveller is a regular employee, so approver must be the department manager
            newApproversRow[CardDocument.Approvers.Approver] = traveller.Unit?.Manager?.GetObjectId();
        }
        
        approversRows.Add(newApproversRow);

        sessionContext.ObjectContext.SaveObject(card);
        sessionContext.ObjectContext.AcceptChanges();
    }

    public int GetUserCreatedApplicationCardsCount(SessionContext sessionContext, Guid cardId)
    {
        ExtensionManager extensionManager = sessionContext.Session.ExtensionManager;
        ExtensionMethod getAppCount = extensionManager.GetExtensionMethod("MY_SE", "GetApplicationCount");
        getAppCount.Parameters.AddNew("employeeId", ParameterValueType.Guid, sessionContext.UserInfo.EmployeeId);
        return int.Parse(getAppCount.Execute() + "");
    }

    public InfoRowCollection GetEmployeeTripHistory(SessionContext sessionContext, Guid travellerId)
    {
        ExtensionManager extensionManager = sessionContext.Session.ExtensionManager;
        ExtensionMethod getTripHistory = extensionManager.GetExtensionMethod("MY_SE", "GetTripHistory");
        getTripHistory.Parameters.AddNew("employeeId", ParameterValueType.Guid, travellerId);
        return getTripHistory.ExecuteReader();
    }

    private StaffUnit GetRootUnit(StaffUnit unit)
    {
        while (unit.ParentUnit != null)
        {
            unit = unit.ParentUnit;
        }
        return unit;
    }

    private BaseCardSectionRow GetBusinessTripRequestSectionRow(Document businessTripAppCard)
    {
        IList tripSection = businessTripAppCard.GetSection(businessTripAppCard.CardType.Sections
            .First(s => s.Name == "BusinessTripRequest")
            .Id);

        BaseCardSectionRow row;
        if (tripSection.Count == 0)
        {
            row = new BaseCardSectionRow();
            tripSection.Add(row);
        }
        else
        {
            row = (BaseCardSectionRow)tripSection[0]!;
        }

        return row;
    }

}