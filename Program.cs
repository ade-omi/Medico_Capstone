using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MedicoAPI.Data;
using MedicoAPI.Controllers;
using MedicoAPI.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using static System.Net.WebRequestMethods;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MedicoAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MedicoAPIContext") ?? throw new InvalidOperationException("Connection string 'MedicoAPIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowSpecificOrigin",
            builder => builder.WithOrigins("http://127.0.0.1:5500")
                              .AllowAnyMethod()
                              .AllowAnyHeader()));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.Authority = "https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_AiLYmagKl";
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_AiLYmagKl",
        ValidateLifetime = true,
        RoleClaimType = "cognito:groups"

    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
