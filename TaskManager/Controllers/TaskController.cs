// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TaskController.cs" company="TaskManager">
//   TaskManager
// </copyright>
// <summary>
//   Defines the TaskController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace TaskManager.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using Models;

    /// <inheritdoc />
    [Route("api/[controller]")]
    public class TaskController : BaseController
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TaskController"/> class.
        /// </summary>
        /// <param name="db">
        /// The db.
        /// </param>
        public TaskController(DAL.TaskContext db)
        {
            Db = db;
        }

        /// <summary>
        /// Gets the db.
        /// </summary>
        private DAL.TaskContext Db { get; }

        /// <summary>
        /// The add task.
        /// </summary>
        /// <param name="taskData">
        /// The task data.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        [HttpPut]
        public ActionResult AddTask([FromBody] TaskModel taskData)
        {
            if (!ModelState.IsValid)
            {
                return GetValidationErrors();
            }

            // compute current timestamp
            taskData.CreatedAt = (long)(System.DateTime.UtcNow - new System.DateTime(1970, 1, 1)).TotalSeconds;

            var newTask = Db.Tasks.Add(taskData).Entity;
            Db.SaveChanges();

            return GetResponseData(newTask);
        }

        /// <summary>
        /// The get tasks.
        /// </summary>
        /// <returns>
        /// The <see cref="TaskModel"/>.
        /// </returns>
        [HttpGet]
        public ActionResult GetTasks()
        {
            return GetResponseData(Db.Tasks);
        }

        /// <summary>
        /// The get task.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        [Route("{id}")]
        [HttpGet]
        public ActionResult GetTask(int id)
        {
            return GetResponseData(Db.Tasks.FirstOrDefault(task => task.Id == id));
        }

        /// <summary>
        /// The remove task.
        /// </summary>
        /// <param name="taskData">
        /// The task data.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        [HttpDelete]
        public ActionResult RemoveTask([FromBody] TaskModel taskData)
        {
            if (!ModelState.IsValid)
            {
                return GetValidationErrors();
            }

            // TODO: Remove tasks recursive
            Db.Entry(taskData).State = EntityState.Deleted;
            Db.SaveChanges();

            return GetResponseData(Db.Tasks);
        }

        /// <summary>
        /// The update task.
        /// </summary>
        /// <param name="taskData">
        /// The task data.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        [HttpPatch]
        public ActionResult UpdateTask([FromBody] TaskModel taskData)
        {
            if (!ModelState.IsValid)
            {
                return GetValidationErrors();
            }

            // TODO: Update tasks recursive
            // TODO: ignore update if previous status == 0
            if (taskData.Status == 3)
            {
                taskData.CompletedAt = GetCurrentTimestamp();
            }

            Db.Entry(taskData).State = EntityState.Modified;
            Db.SaveChanges();
            return GetResponseData(Db.Tasks);
        }
    }
}