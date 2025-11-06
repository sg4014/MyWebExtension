using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using Microsoft.AspNetCore.Mvc;
using MyDVExtension.Server.Model;
using MyDVExtension.Server.Services.Interfaces;
using System;

namespace MyDVExtension.Server.Controllers;

public class BusinessTripAppController : ControllerBase
{
	private readonly ICurrentObjectContextProvider _contextProvider;
	private readonly IBusinessTripAppService _businessTripAppService;
	
	public BusinessTripAppController(
		ICurrentObjectContextProvider contextProvider,
		IBusinessTripAppService businessTripAppService)
	{
		_contextProvider = contextProvider;
		_businessTripAppService = businessTripAppService;
	}
	
	[HttpPost]
	public CommonResponse<BusinessTripAppTravellerModel> GetBusinessTripAppTraveller(
		[FromBody] BusinessTripAppTravellerRequestModel model)
	{
		
		var sessionContext = _contextProvider.GetOrCreateCurrentSessionContext();
		var result = _businessTripAppService.GetBusinessTripAppTravellerModel(
			sessionContext, model.travellerId);
		
		return CommonResponse.CreateSuccess(result);
	}

	[HttpPost]
	public CommonResponse<BusinessTripAppTotalAllowanceModel> GetBusinessTripAppTotalAllowance(
		[FromBody] BusinessTripAppTotalAllowanceRequestModel model)
	{
		if (model.DaysInTrip is null)
		{
			ArgumentNullException.ThrowIfNull(nameof(model.DaysInTrip));
		}

        var sessionContext = _contextProvider.GetOrCreateCurrentSessionContext();
        var result = _businessTripAppService.GetBusinessTripAppTotalAllowanceModel(
            sessionContext, model.City, (int)model.DaysInTrip);

		return CommonResponse.CreateSuccess(result);
    }

	[HttpGet]
    public CommonResponse GetBusinessTripAppCreatedCardsCount(Guid cardId)
	{
		var sessionContext = _contextProvider.GetOrCreateCurrentSessionContext();
		return CommonResponse.CreateSuccess(
			_businessTripAppService.GetUserCreatedApplicationCardsCount(sessionContext, cardId)
		);
    }
}