using Autofac;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.Layout.WebClient.Services;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle;
using Microsoft.Extensions.DependencyInjection;
using MyDVExtension.Server.CardLifeCycle;
using MyDVExtension.Server.DataGridPlugins;
using MyDVExtension.Server.Services;
using MyDVExtension.Server.Services.Interfaces;
using System;


namespace MyDVExtension.Server;

public class ServerExtension {
	public class MyExtension : WebClientExtension {
		public MyExtension() : base() { }

		public override string ExtensionName => "MyExtension";
		
		public override Version ExtensionVersion => new(1, 0, 0);

		public override void InitializeServiceCollection(IServiceCollection services) {
			services.AddSingleton<IBusinessTripAppService, BusinessTripAppService>();
            services.AddSingleton<IDataGridControlPlugin, EmployeeTripHistoryPlugin>();

            services.Decorate<ICardLifeCycleEx>((original, serviceProvider) => {
                var typeId = original.CardTypeId;
                if (typeId == CardDocument.ID)
                {
                    var businessTripAppSvc = serviceProvider.GetRequiredService<IBusinessTripAppService>();
                    return new BusinessTripAppLifeCycle(original, businessTripAppSvc);
                }
                return original;
            });
        }
	}
}