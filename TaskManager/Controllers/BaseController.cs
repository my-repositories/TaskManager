// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BaseController.cs" company="TaskManager">
//   TaskManager
// </copyright>
// <summary>
//   Defines the BaseController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace TaskManager.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;

    /// <inheritdoc />
    public class BaseController : Controller
    {
        /// <summary>
        /// The get validation errors.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        protected ActionResult GetValidationErrors()
        {
            return Json(
                new
                {
                    errors = ModelState.Values.SelectMany(x => x.Errors)
                        .Select(x => x.ErrorMessage)
                        .ToArray()
                });
        }

        /// <summary>
        /// The get response data.
        /// </summary>
        /// <param name="response">
        /// The data.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        protected ActionResult GetResponseData(object response)
        {
            return Json(new { data = response });
        }

        /// <summary>
        /// The get current timestamp.
        /// </summary>
        /// <returns>
        /// The <see cref="long"/>.
        /// </returns>
        protected long GetCurrentTimestamp()
        {
            return (long)(System.DateTime.UtcNow - new System.DateTime(1970, 1, 1)).TotalSeconds;
        }
    }
}
