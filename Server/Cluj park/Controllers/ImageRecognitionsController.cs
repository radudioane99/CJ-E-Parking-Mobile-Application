using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.IO;

namespace Cluj_park.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageRecognitionsController : ODataController
    {
        private readonly IImageRecognitionRepository imageRecognitionRepository;

        public ImageRecognitionsController(IImageRecognitionRepository imageRecognitionRepository)
        {
            this.imageRecognitionRepository = imageRecognitionRepository;
        }

        [HttpPost]
        [HttpPost("CheckImage")]
        public ActionResult<string> ImageProcessing([FromForm(Name = "file")] IFormFile file)
        {
            string finalResult = "";
            if (file.Length > 0)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Images\\Files2");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                FileInfo fileInfo = new FileInfo(file.FileName);

                string fileNameWithPath = Path.Combine(path, file.FileName);
                using (var ms = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    file.CopyTo(ms);
                    var text1 = this.imageRecognitionRepository.RecognizeImage(fileNameWithPath);

                    finalResult = text1;
                }
            }


            return this.Ok(finalResult);
        }
    }
}
