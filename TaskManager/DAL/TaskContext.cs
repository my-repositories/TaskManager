// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TaskContext.cs" company="TaskManager">
//   TaskManager
// </copyright>
// <summary>
//   Defines the SchoolContext type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace TaskManager.DAL
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    /// <inheritdoc />
    public class TaskContext : DbContext
    {
        /// <inheritdoc />
        public TaskContext(DbContextOptions options) : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the tasks.
        /// </summary>
        public DbSet<TaskModel> Tasks { get; set; }

        /// <inheritdoc />
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>().ToTable("Tasks");
        }
    }
}