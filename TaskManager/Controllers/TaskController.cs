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
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    /// <inheritdoc />
    [Route("api/[controller]")]
    public class TaskController : Controller
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
        /// The get tasks.
        /// </summary>
        /// <returns>
        /// The <see cref="TaskModel"/>.
        /// </returns>
        [HttpGet]
        public IEnumerable<TaskModel> GetTasks()
        {
            return Db.Tasks;
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
            return Json(Db.Tasks.FirstOrDefault(task => task.Id == id));
        }
    }
}