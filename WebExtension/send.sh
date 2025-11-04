#! /bin/bash
npm run build
scp -P 2222 -r ./output/Content/Modules/MyWebExtension dvadmin@localhost:/home/dvadmin
ssh -p 2222 dvadmin@localhost