using DocsVision.BackOffice.ObjectModel;
using DocsVision.Layout.WebClient.Models;
using DocsVision.Layout.WebClient.Models.TableData;
using DocsVision.Layout.WebClient.Services;
using DocsVision.Platform.WebClient;
using Microsoft.Extensions.DependencyInjection;
using MyDVExtension.Server.Services;
using MyDVExtension.Server.Services.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDVExtension.Server.DataGridPlugins;

public class EmployeeTripHistoryPlugin : IDataGridControlPlugin
{
    public IBusinessTripAppService _tripService;

    public EmployeeTripHistoryPlugin(IBusinessTripAppService tripService)
    {
        _tripService = tripService;
    }

    public string Name => "EmployeeTripHistoryPlugin";

    public TableModel GetTableData(SessionContext sessionContext, List<ParamModel> parameters)
    {
        TableModel tableModel = new TableModel();

        string numerationColumn = "numeration";
        string tripStartDateColumn = "tripStartDate";
        string cityColumn = "city";
        string reasonForTripColumn = "reasonForTrip";
        string stateColumn = "state";

        tableModel.Columns.Add(new ColumnModel()
        {
            Id = numerationColumn,
            Name = "№",
            Type = DocsVision.WebClient.Models.Grid.ColumnType.Integer
        });

        tableModel.Columns.Add(new ColumnModel()
        {
            Id = tripStartDateColumn,
            Name = "Дата выезда",
            Type = DocsVision.WebClient.Models.Grid.ColumnType.String
        });

        tableModel.Columns.Add(new ColumnModel()
        {
            Id = cityColumn,
            Name = "Город",
            Type = DocsVision.WebClient.Models.Grid.ColumnType.String
        });

        tableModel.Columns.Add(new ColumnModel()
        {
            Id = reasonForTripColumn,
            Name = "Основание для поездки",
            Type = DocsVision.WebClient.Models.Grid.ColumnType.DateTime
        });

        tableModel.Columns.Add(new ColumnModel()
        {
            Id = stateColumn,
            Name = "Статус заявки",
            Type = DocsVision.WebClient.Models.Grid.ColumnType.String
        });

        Guid cardId = new Guid(parameters.FirstOrDefault(p => p.Key == "CurrentCardId").Value);
        Document tripAppCard = sessionContext.ObjectContext.GetObject<Document>(cardId);

        IList tripSection = tripAppCard.GetSection(tripAppCard.CardType.Sections
            .First(s => s.Name == "BusinessTripRequest")
            .Id);

        if (tripSection.Count == 0)
        {
            // Нет данных о командируемом
            return tableModel;
        }

        var row = (BaseCardSectionRow)tripSection[0]!;
        var travellerId = (Guid)row["Traveller"];
        ArgumentNullException.ThrowIfNull(travellerId, nameof(travellerId));

        ArgumentNullException.ThrowIfNull(_tripService, nameof(_tripService));

        var tripHistory = _tripService?.GetEmployeeTripHistory(sessionContext, travellerId);
        ArgumentNullException.ThrowIfNull(tripHistory, nameof(tripHistory));

        int number = 1;

        foreach (var trip in tripHistory)
        {
            string tableRowId = Guid.NewGuid().ToString();

            tableModel.Rows.Add(new RowModel()
            {
                Id = tableRowId,
                EntityId = tableRowId,

                Cells = new List<CellModel>()
                {
                    new CellModel()
                    {
                        ColumnId = numerationColumn,
                        Value = number
                    },
                    new CellModel()
                    {
                        ColumnId = tripStartDateColumn,
                        Value = DateOnly.FromDateTime(trip.GetDateTime("trip_start").Value).ToString()
                    },
                    new CellModel()
                    {
                        ColumnId = cityColumn,
                        Value = trip.GetString("city_name")
                    },
                    new CellModel()
                    {
                        ColumnId = reasonForTripColumn,
                        Value = trip.GetString("reason")
                    },
                    new CellModel()
                    {
                        ColumnId = stateColumn,
                        Value = trip.GetString("status")
                    }
                }
            });

            ++number;
        }

        tableModel.Id = Guid.NewGuid().ToString();

        return tableModel;
    }
}

