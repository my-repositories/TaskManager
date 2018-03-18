using System.Data.Entity;
using TaskManager.Models;

namespace TaskManager.DAL
{
    public class TaskContext : DbContext
    {
        public TaskContext() : base("TaskContext")
        {
        }

        public DbSet<TaskModel> Tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>().ToTable("Tasks");
        }
    }
}