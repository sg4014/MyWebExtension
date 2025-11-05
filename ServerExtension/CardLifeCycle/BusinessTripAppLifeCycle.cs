using DocsVision.Platform.WebClient;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle.Options;
using MyDVExtension.Server.Services;
using SkiaSharp;
using System;
using System.Collections.Generic;

public class BusinessTripAppLifeCycle : ICardLifeCycleEx
{
    public BusinessTripAppLifeCycle(ICardLifeCycleEx baseLifeCycle, IBusinessTripAppService service)
    {
        BaseLifeCycle = baseLifeCycle;
        BusinessTripAppService = service;
    }
    protected ICardLifeCycleEx BaseLifeCycle { get; }
    protected IBusinessTripAppService BusinessTripAppService { get; }
    public Guid CardTypeId => BaseLifeCycle.CardTypeId;
    public Guid Create(SessionContext sessionContext, CardCreateLifeCycleOptions options)
    {
        var cardId = BaseLifeCycle.Create(sessionContext, options);
        var businessTripAppCardKindId = new Guid("ED6271FF-FE59-46BC-A66D-8809BF2AACAE");
        if (businessTripAppCardKindId.Equals(Guid.Empty))
        {
            throw new ArgumentException("business trip card kind GUID is invalid");
        }
        if (options.CardKindId.Equals(businessTripAppCardKindId))
        {
            BusinessTripAppService.InitCard(sessionContext, cardId);
        }
        return cardId;
    }

    public bool CanDelete(SessionContext sessionContext, CardDeleteLifeCycleOptions options, out string message)
        => BaseLifeCycle.CanDelete(sessionContext, options, out message);

    public string GetDigest(SessionContext sessionContext, CardDigestLifeCycleOptions options)
        => BaseLifeCycle.GetDigest(sessionContext, options);

    public void OnDelete(SessionContext sessionContext, CardDeleteLifeCycleOptions options)
        => BaseLifeCycle.OnDelete(sessionContext, options);

    public void OnSave(SessionContext sessionContext, CardSaveLifeCycleOptions options)
        => BaseLifeCycle.OnSave(sessionContext, options);

    public bool Validate(SessionContext sessionContext, CardValidateLifeCycleOptions options, out List<ValidationResult> Validate)
        => BaseLifeCycle.Validate(sessionContext, options, out Validate);
}
