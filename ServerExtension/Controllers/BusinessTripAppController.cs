using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using Microsoft.AspNetCore.Mvc;
using MyDVExtension.Server.Model;
using MyDVExtension.Server.Services;

namespace MyDVExtension.Server.Controllers;

public class BusinessTripAppController : ControllerBase {
	private readonly ICurrentObjectContextProvider _contextProvider;
	private readonly IBusinessTripAppService _businessTripAppService;
	
	public BusinessTripAppController(
		ICurrentObjectContextProvider contextProvider,
		IBusinessTripAppService businessTripAppService) {
		_contextProvider = contextProvider;
		_businessTripAppService = businessTripAppService;
	}
	
	[HttpPost]
	public CommonResponse<BusinessTripAppTravellerModel> GetBusinessTripAppTraveller(
		[FromBody] BusinessTripAppTravellerRequestModel model) {
		
		var sessionContext = _contextProvider.GetOrCreateCurrentSessionContext();
		var result = _businessTripAppService.GetBusinessTripAppTravellerModel(
			sessionContext, model.documentId);
		
		return CommonResponse.CreateSuccess(result);
	}
}