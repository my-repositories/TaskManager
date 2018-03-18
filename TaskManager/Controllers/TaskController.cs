using System.Web.Mvc;

namespace TaskManager.Controllers
{
    public class TaskController : Controller
    {
        public ViewResult Add()
        {
            ViewBag.Title = "Add Task";
            return View();
        }

        public ViewResult Details(int id)
        {
            ViewBag.Title = "Task #" + id;
            return View();
        }

        public ViewResult List()
        {
            ViewBag.Title = "Task List";
            return View();
        }

        public PartialViewResult Tree()
        {
            return PartialView();
        }
    }
}