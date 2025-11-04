using System;
using System.Collections;
using System.Linq;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.WebClient;
using MyDVExtension.Server.Model;

namespace MyDVExtension.Server.Services;

public class BusinessTripAppService : IBusinessTripAppService {
	public BusinessTripAppTravellerModel GetBusinessTripAppTravellerModel(SessionContext sessionContext, Guid cardId) {
		var card = sessionContext.ObjectContext.GetObject<Document>(cardId)
		           ?? throw new ArgumentException("Card with the given card id doesn't exist");
		
		IList tripSection = card.GetSection(card.CardType.Sections
			.First(section => section.Name == "BusinessTripRequest")
			.Id);

		if (tripSection.Count == 0) {
			throw new InvalidOperationException("The trip section doesn't have any rows");
		}

		var row = (BaseCardSectionRow)tripSection[0]!;

		var staffSvc = sessionContext.ObjectContext.GetService<IStaffService>();
		StaffEmployee traveller = staffSvc.Get((Guid)row["Traveller"]);
		
		if (traveller is null) {
			throw new InvalidOperationException("Traveller with such id does not exist");
		}

		return new BusinessTripAppTravellerModel {
			Id = traveller.GetObjectId(),
			ExecutiveId = staffSvc.GetEmployeeManager(traveller).GetObjectId(),
			Phone = traveller.Phone
		};
	}
}