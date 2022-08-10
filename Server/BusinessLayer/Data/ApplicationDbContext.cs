using BusinessLayer.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<Report> Reports { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=CjPark;Trusted_Connection=True;MultipleActiveResultSets=true");
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CLuj_Park;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

    }
}
