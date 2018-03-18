# TaskManager
## Prerequisites

Run this command in Package Manager Console

```
Update-Database
```

----

See this [demo project](http://18.217.229.120:8002/) on Amazon Web Service.

----

If you want deploy this project on production server with .NET Core, follow this instructions:

## Install
- .NET Core
  - [for Linux](https://www.microsoft.com/net/learn/get-started/linuxubuntu)
  - [for macOs](https://www.microsoft.com/net/learn/get-started/macos)
  - [for Windows](https://www.microsoft.com/net/learn/get-started/windows)

## Build
```bash
dotnet build TaskManager.csproj -c Release

ln -s $(pwd)/appsettings.json $(pwd)/bin/Release/netcoreapp2.0/appsettings.json
ln -s $(pwd)/wwwroot $(pwd)/bin/Release/netcoreapp2.0/wwwroot
```
## Configure
```bash
dotnet restore
dotnet ef database update
```
## Startup
```bash
cd ./bin/Release/netcoreapp2.0/
dotnet TaskManager.dll
```
