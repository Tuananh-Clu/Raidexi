FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Raidexi/Raidexi.csproj Raidexi/
RUN dotnet restore Raidexi/Raidexi.csproj

COPY Raidexi/ Raidexi/
WORKDIR /src/Raidexi
RUN dotnet publish Raidexi.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "Raidexi.dll"]


