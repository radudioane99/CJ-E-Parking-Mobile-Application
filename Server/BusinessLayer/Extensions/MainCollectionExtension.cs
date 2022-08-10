using BusinessLayer.Data;
using BusinessLayer.Interfaces;
using BusinessLayer.Repositories;
using BusinessLayer.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLayer.Extensions
{
    public static class MainCollectionExtension
    {
        public static IServiceCollection AddMainFramework(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IImageRecognitionRepository, ImageRecognitionRepository>();
            services.AddScoped<ICarRepository, CarRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddDbContext<ApplicationDbContext>();
            return services;
        }
    }
}
