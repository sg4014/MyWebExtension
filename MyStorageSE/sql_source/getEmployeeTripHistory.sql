create or replace function "getTripHistory"(val_employeeid uuid)
	returns table(trip_start TIMESTAMP WITHOUT TIME ZONE, city_name text, reason text, status text)
	language plpgsql
	as $function$
	begin
		return query(
			select
				tripSec."TripStart" AS trip_start,
				dirDesignerRow."Name" AS city_name,
				tripSec."ReasonForTrip" AS reason,
				localizedStates."Name" AS status
			from
				public."dvtable_{30eb9b87-822b-4753-9a50-a1825dca1b74}" mainInfoSec
				join public."dvtable_{51c333e6-a252-4139-a284-dee74127cb87}" tripSec
					on mainInfoSec."InstanceID" = tripSec."InstanceID"
				join public."dvtable_{1b1a44fb-1fb1-4876-83aa-95ad38907e24}" dirDesignerRow
					on tripSec."City" = dirDesignerRow."RowID"
				join public."dvtable_{521b4477-dd10-4f57-a453-09c70adb7799}" states
					on mainInfoSec."State" = states."RowID"
				join public."dvtable_{da37ca71-a977-48e9-a4fd-a2b30479e824}" localizedStates
					on states."RowID" = localizedStates."ParentRowID"
			where
				tripSec."Traveller" = val_employeeid
				and mainInfoSec."Kind" = 'ed6271ff-fe59-46bc-a66d-8809bf2aacae'
				and localizedStates."LocaleID" = 1049
			order by
				tripSec."TripStart"
		);
	end;
	$function$;