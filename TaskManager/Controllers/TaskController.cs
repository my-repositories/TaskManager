using System.Data.Entity;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

using TaskManager.Models;
using TaskManager.Models.TaskViewModels;

namespace TaskManager.Controllers
{
    public class TaskController : Controller
    {
        private readonly DAL.TaskContext _db = new DAL.TaskContext();

        public ViewResult Add()
        {
            ViewBag.Title = "Add Task";
            return View();
        }

        [HttpPost]
        public ActionResult Add(TaskModel task)
        {
            ViewBag.Title = "Add Task";

            if (!ModelState.IsValid)
            {
                var addViewModel = AutoMapper.Mapper.Map<TaskModel, AddViewModel>(task);
                return View(addViewModel);
            }

            // compute current timestamp
            task.CreatedAt = (long)(System.DateTime.UtcNow - new System.DateTime(1970, 1, 1)).TotalSeconds;

            var newTask = _db.Tasks.Add(task);
            _db.SaveChanges();

            return RedirectToAction("Details", "Task", new { id = newTask.Id });
        }

        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            var task = await _db.Tasks.FindAsync(id);

            if (task == null)
            {
                return HttpNotFound();
            }

            await _db.Database.ExecuteSqlCommandAsync(GetRemoveTaskQueryText(), id);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public async Task<ActionResult> Details(int id)
        {
            var task = await _db.Tasks.FindAsync(id);

            if (task == null)
            {
                return HttpNotFound();
            }

            ViewBag.Title = task.Title;
            return View(task);
        }

        public async Task<ActionResult> Edit(int id)
        {
            var task = await _db.Tasks.FindAsync(id);

            if (task == null)
            {
                return HttpNotFound();
            }

            var editViewModel = AutoMapper.Mapper.Map<TaskModel, EditViewModel>(task);

            ViewBag.Title = "Edit Task";
            return View(editViewModel);
        }

        [HttpPost]
        public ActionResult Edit(TaskModel task)
        {
            ViewBag.Title = "Edit Task";

            if (!ModelState.IsValid)
            {
                var editViewModel = AutoMapper.Mapper.Map<TaskModel, EditViewModel>(task);
                return View(editViewModel);
            }

            _db.Entry(task).State = EntityState.Modified;
            _db.SaveChanges();

            return RedirectToAction("Details", "Task", new { id = task.Id });
        }

        public async Task<ViewResult> List()
        {
            ViewBag.Title = "Task List";

            var tasks = await _db.Tasks.ToListAsync();

            return View(tasks);
        }

        [ChildActionOnly]
        public PartialViewResult Tree()
        {
            return PartialView();
        }

        private string GetRemoveTaskQueryText()
        {
            return @"
    WITH [TaskWithAllChildTasks] ([Id], [ParentId]) AS
    (
        SELECT @p0, NULL
        UNION ALL
        SELECT [T].[Id], [T].[ParentId]
        FROM [Tasks] AS [T]
        JOIN [TaskWithAllChildTasks] AS [TC] ON ([T].[ParentId] = [TC].[Id])
    )
    DELETE FROM [Tasks]
    WHERE [Id] IN (SELECT [Id] FROM [TaskWithAllChildTasks]);";
        }
    }
}