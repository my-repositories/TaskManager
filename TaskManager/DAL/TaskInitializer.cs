// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TaskInitializer.cs" company="TaskManager">
//   TaskManager
// </copyright>
// <summary>
//   Defines the TaskInitializer type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace TaskManager.DAL
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;
    using Models;

    /// <summary>
    /// The task initializer.
    /// </summary>
    public static class TaskInitializer
    {
        /// <summary>
        /// The initialize.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        public static void Initialize(TaskContext context)
        {
            var tasks = new List<TaskModel>
            {
                new TaskModel
                {
                    CreatedAt = 1519967841,
                    CompletedAt = 0,
                    Description = "Learn General C# Programming Constructs.",
                    EstimatedTime = 27558,
                    LeadTime = 0,
                    ParentId = 0,
                    Responsible = "loktionov129",
                    Status = 1,
                    Title = "Learn C#",
                },
                new TaskModel
                {
                    CreatedAt = 1519967841,
                    CompletedAt = 0,
                    Description = "You must learn basics to advance level features of MVC.",
                    EstimatedTime = 19260,
                    LeadTime = 0,
                    ParentId = 1,
                    Responsible = "loktionov129",
                    Status = 1,
                    Title = "Learn ASP.NET MVC",
                },
                new TaskModel
                {
                    CreatedAt = 1519967841,
                    CompletedAt = 0,
                    Description = "Learn Architecture, Database Setup, Data Model, DbContext, Relationships...",
                    EstimatedTime = 14720,
                    LeadTime = 0,
                    ParentId = 1,
                    Responsible = "loktionov129",
                    Status = 1,
                    Title = "Learn EF",
                },
                new TaskModel
                {
                    CreatedAt = 1519967841,
                    CompletedAt = 1519967941,
                    Description = "Description for test task#4.",
                    EstimatedTime = 1191,
                    LeadTime = 180,
                    ParentId = 0,
                    Responsible = "TestUser",
                    Status = 3,
                    Title = "Test task",
                },
            };

            context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT [dbo].[Tasks] ON");
            tasks.ForEach(s => context.Tasks.Add(s));
            context.SaveChanges();
            context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT [dbo].[Tasks] OFF");
        }
    }
}