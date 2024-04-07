using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MedicoAPI.Data;
using MedicoAPI.Controllers;
using MedicoAPI.Models;
using Microsoft.Extensions.Hosting;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MedicoAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MedicoAPIContext") ?? throw new InvalidOperationException("Connection string 'MedicoAPIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors( options =>
    options.AddPolicy("AllowSpecificOrigin",
            builder => builder.WithOrigins("http://127.0.0.1:5500")
                              .AllowAnyMethod()
                              .AllowAnyHeader())
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
