using System.Web.Mvc;

namespace TaskManager.Utils
{
    public static class HtmlExtensions
    {
        public static string IsActive(this HtmlHelper html,
                                      string control,
                                      string action,
                                      int? id = null)
        {
            var routeData = html.ViewContext.RouteData;

            var routeAction = (string)routeData.Values["action"];
            var routeController = (string)routeData.Values["controller"];
            int? routeId = null;

            if (routeData.Values["id"] != null)
            {
                routeId = int.Parse((string)routeData.Values["id"]);
            }

            var returnActive = control == routeController
                               &&
                               action == routeAction
                               && (id == null || id == routeId);

            return returnActive ? "active" : "";
        }
    }
}