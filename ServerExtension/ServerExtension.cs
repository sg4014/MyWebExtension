using System;
using DocsVision.WebClient.Extensibility;
using Microsoft.Extensions.DependencyInjection;
using MyDVExtension.Server.Services;


namespace MyDVExtension.Server;

public class ServerExtension {
	public class MyExtension : WebClientExtension {
		public MyExtension() : base() { }

		public override string ExtensionName => "MyExtension";
		
		public override Version ExtensionVersion => new(1, 0, 0);

		public override void InitializeServiceCollection(IServiceCollection services) {
			services.AddSingleton<IBusinessTripAppService, BusinessTripAppService>();
		}
	}
}