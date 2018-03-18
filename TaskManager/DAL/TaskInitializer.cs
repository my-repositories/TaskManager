using System.Collections.Generic;
using System.Linq;
using TaskManager.Models;

namespace TaskManager.DAL
{
    public class TaskInitializer : System.Data.Entity.CreateDatabaseIfNotExists<TaskContext>
    {
        protected override void Seed(TaskContext context)
        {
            // Look for any tasks.
            if (context.Tasks.Any())
            {
                return;   // DB has been seeded
            }

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
                    CreatedAt = 1519967846,
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
                    CreatedAt = 1519967851,
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
                    CreatedAt = 1519967861,
                    CompletedAt = 1519967941,
                    Description = "Description for test task#4.",
                    EstimatedTime = 1191,
                    LeadTime = 0,
                    ParentId = 0,
                    Responsible = "TestUser",
                    Status = 0,
                    Title = "Test task",
                },
                new TaskModel
                {
                    CreatedAt = 1519967841,
                    CompletedAt = 1519967941,
                    Description = "This is description for subtask#5 of main task#4",
                    EstimatedTime = 480,
                    LeadTime = 360,
                    ParentId = 4,
                    Responsible = "TestUser",
                    Status = 1,
                    Title = "Subtask for #4: Test task",
                },
                new TaskModel
                {
                    CreatedAt = 1519967841,
                    CompletedAt = 1519967941,
                    Description = "This is description for subtask#6 of sub task#5",
                    EstimatedTime = 480,
                    LeadTime = 360,
                    ParentId = 5,
                    Responsible = "TestUser",
                    Status = 2,
                    Title = "Subtask for sub task#5",
                },

                new TaskModel
                {
                    CreatedAt = 1520051086,
                    CompletedAt = 1519966777,
                    Description = "Get the skills to build engaging, interactive user experiences on the web as a front-end web developer.",
                    EstimatedTime = 9600,
                    LeadTime = 7200,
                    ParentId = 0,
                    Responsible = "loktionov129",
                    Status = 3,
                    Title = "Learn Frontend",
                },
                new TaskModel
                {
                    CreatedAt = 1520051091,
                    CompletedAt = 1519966777,
                    Description = "To build websites, you should know about HTML — the fundamental technology used to define the structure of a webpage",
                    EstimatedTime = 2400,
                    LeadTime = 2200,
                    ParentId = 7,
                    Responsible = "loktionov129",
                    Status = 3,
                    Title = "Learn HTML",
                },
                new TaskModel
                {
                    CreatedAt = 1520051096,
                    CompletedAt = 1519966777,
                    Description = "Cascading Stylesheets — or CSS — is the first technology you should start learning after HTML.",
                    EstimatedTime = 4800,
                    LeadTime = 3750,
                    ParentId = 7,
                    Responsible = "loktionov129",
                    Status = 3,
                    Title = "Learn CSS",
                },
                new TaskModel
                {
                    CreatedAt = 1520051099,
                    CompletedAt = 1519966777,
                    Description = " JavaScript is a programming language that allows you to implement complex things on web pages.",
                    EstimatedTime = 2400,
                    LeadTime = 2200,
                    ParentId = 7,
                    Responsible = "loktionov129",
                    Status = 3,
                    Title = "Learn Javascript",
                },
                new TaskModel
                {
                    CreatedAt = 1520051115,
                    CompletedAt = 1519966777,
                    Description = "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
                    EstimatedTime = 2400,
                    LeadTime = 2200,
                    ParentId = 10,
                    Responsible = "loktionov129",
                    Status = 3,
                    Title = "Learn ReactJS",
                }
            };

            context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT [dbo].[Tasks] ON");
            tasks.ForEach(s => context.Tasks.Add(s));
            context.SaveChanges();
            context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT [dbo].[Tasks] OFF");
        }
    }
}