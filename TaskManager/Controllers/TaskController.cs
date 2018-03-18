using System.Net;
using System.Web.Mvc;
using System.Threading.Tasks;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    using System.Data.Entity;

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
                return View(task);
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

            _db.Tasks.Remove(task);
            _db.SaveChanges();
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

            ViewBag.Title = "Edit Task";
            return View(task);
        }

        [HttpPost]
        public ActionResult Edit(TaskModel task)
        {
            ViewBag.Title = "Edit Task";

            if (!ModelState.IsValid)
            {
                return View(task);
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
    }
}