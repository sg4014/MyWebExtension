#! /bin/bash
dotnet build && \
scp -P 2222 -r /home/sergey/EngineerSchool/MyExtension/ServerExtension/bin/Debug/net8.0/* \
 dvadmin@localhost:/home/dvadmin/MyServerExtension && \
 
ssh -p 2222 dvadmin@localhost