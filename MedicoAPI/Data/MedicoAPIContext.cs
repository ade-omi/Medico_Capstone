using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MedicoAPI.Models;
using System.Configuration;
using System.Transactions;

namespace MedicoAPI.Data
{
    public class MedicoAPIContext : DbContext
    {
        public MedicoAPIContext (DbContextOptions<MedicoAPIContext> options)
            : base(options)
        {
            //DISBALED LAZY LOADING TO AVOID CIRCULAR QUERY ON THE DATABASE
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

        public DbSet<MedicoAPI.Models.Patient> Patient { get; set; } = default!;
        public DbSet<Appointment> Appointment { get; set; } = default!;
        public DbSet<MedicoAPI.Models.Doctor> Doctor { get; set; } = default!;
        public DbSet<MedicoAPI.Models.Prescription> Prescription { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //SETTING UP PRIMARY KETS
            modelBuilder.Entity<Patient>()
                .HasKey(p => p.PatientId);

            modelBuilder.Entity<Doctor>()
                .HasKey(d => d.DoctorId);

            modelBuilder.Entity<Appointment>()
                .HasKey(a => a.AppointmentId);

            modelBuilder.Entity<Prescription>()
                .HasKey(pr => pr.PrescriptionId);


            /* FOREIGN KEY / RELATIONSHIPS DEFINITION */

            //PATIENT - APPOINTMENT
            modelBuilder.Entity<Patient>()
                .HasMany(p => p.Appointments)
                .WithOne(a => a.Patient)
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Cascade);
            //PATIENT - PRESCRIPTION
            modelBuilder.Entity<Patient>()
                .HasMany(p => p.Prescriptions)
                .WithOne(pr => pr.Patient)
                .HasForeignKey(pr => pr.PatientId)
                .OnDelete(DeleteBehavior.Cascade);
            //DOCTOR - APPOINTMENTS
            modelBuilder.Entity<Doctor>()
                .HasMany(d => d.Appointments)
                .WithOne(a => a.Doctor)
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);
            //DOCTOR APPOINTMENT
            modelBuilder.Entity<Doctor>()
                .HasMany(d => d.Prescriptions)
                .WithOne(pr => pr.Doctor)
                .HasForeignKey(pr => pr.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);
        }


    }
}
