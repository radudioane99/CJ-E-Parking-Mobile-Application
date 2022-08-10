using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System;
using System.Collections.Generic;
using System.IO;

namespace Cluj_park.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportsController : ODataController
    {
        private readonly IReportRepository reportRepository;

        public ReportsController(IReportRepository reportRepository)
        {
            this.reportRepository = reportRepository;
        }

        [HttpPost("PostReport/{userId}/{locationId}")]
        public ActionResult PostReport([FromForm(Name = "file")] IFormFile file, string userId, string locationId)
        {
            Report report = new Report();
            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    report.Image = ms.ToArray();
                }
            }
            report.LocationId = Int32.Parse(locationId);
            report.UserId = Int32.Parse(userId);
            report.Verified = false;
            report.ReportDate = DateTime.Now;
            this.reportRepository.Create(report);

            return this.Ok();
        }

        [HttpGet("{userId}")]
        public IEnumerable<Report> Get(int userId)
        {
            return this.reportRepository.GetReportsByUser(userId);
        }
    }
}
